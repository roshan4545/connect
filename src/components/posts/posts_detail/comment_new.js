import React, { Component } from 'react';
import axios from 'axios';
// import Header from "../header";
import Helmet from 'react-helmet';
import { connect } from "react-redux";

class CreateUser extends Component {

    constructor(props) {
        super(props)
        this.onChangecontent = this.onChangecontent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            content: ''
        }
    }

    onChangecontent(e) {
        this.setState({ content: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()


        
        const formdet = {
            postId: this.props.match.params.id,
            content: this.state.content
        }

        const token = localStorage.getItem('token')
        axios.post('http://localhost:5000/api/createcomment', formdet,{
            headers: { "Authorization": `Bearer ${token}` }
        })

        setTimeout(() => {
            this.props.history.push({
                pathname: '/posts',
            }); 
        }, 3000);

        
    }
    render() {
        return (
            <div>
                 <br></br>
                 <br></br>
                 <br></br>
                 <br></br>
                    <form onSubmit={this.onSubmit} id="form">
                        <div class="container">
                            <h3>Comment</h3>
                            <input type="text" value={this.state.content} onChange={this.onChangecontent} placeholder="content" />
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
            </div>
        )
    }
}

export default (CreateUser);