import React, { Component } from 'react';
import axios from 'axios';
import Header from "../header";
import Helmet from 'react-helmet';
import { connect } from "react-redux";

class PostNew extends Component {

    constructor(props) {
        super(props)

        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangecategories = this.onChangecategories.bind(this);
        this.onChangecontent = this.onChangecontent.bind(this);
        this.onchangepriority = this.onchangepriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            title: '',
            categories: '',
            content: '',
            ispriority: false,
            postedby: ''
        }
    }

    componentDidMount() {
        if(this.props.authenticated)
        {
            console.log('true')
            axios.get('http://localhost:5000/token', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => {
              if (res.data === false) {
                  this.props.history.replace('/posts')
                }
              })
        }
        else {
            console.log('false')
            this.props.history.replace('/login');
        }
    }
    onChangetitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangecategories(e) {
        this.setState({ categories: e.target.value })
    }

    onChangecontent(e) {
        this.setState({ content: e.target.value })
    }

    onchangepriority(e) {
        this.setState({
            ispriority: !(this.state.ispriority)
        })
    }

    changestringtoarray() {
        this.setState({
            categories: this.state.categories.split(',')
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const formdet = {
            title: this.state.title,
            categories: this.state.categories,
            content: this.state.content
        }

        const token = localStorage.getItem('token')
        axios.post('http://localhost:5000/api/createpost', formdet, {
            headers: { "Authorization": `Bearer ${token}` }
        })

        if (this.state.ispriority == true) {

            axios.get('http://localhost:5000/userdetails', {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then((res) => {
                    axios.post('http://localhost:5000/users')
                        .then((resp) => {
                            var name = res.data.Name
                            var len = resp.data.length
                            for (let index = 0; index < len; index++) {
                                axios.post('http://localhost:5000/sendpriority', {
                                    postedby: name,
                                    email: resp.data[index].Email
                                })
                            }
                        })
                })
        }

        setTimeout(() => {
            this.props.history.push({
                pathname: '/posts',
            }); 
        }, 3000);

    }




    render() {
        return (
            <div>
                <Header />
                <br />
                <br />
                <br />
                <div class="form-container">
                    <form onSubmit={this.onSubmit} id="form">
                        <h3>New post</h3>
                        <div class="container">
                            {/* <span class="icon"><i class="fas fa-user"></i></span> */}
                            <input type="text" value={this.state.title} onChange={this.onChangetitle} placeholder="title"></input>
                        </div>
                        <div class="container">
                            {/* <span class="icon"><i class="fas fa-at"></i></span> */}
                            <input type="text" value={this.state.categories} onChange={this.onChangecategories} placeholder="categories"></input>
                            {/* <div style={{ fontSize: 12, color: "red", fontVariantCaps: "titling-caps", fontFamily: "sans-serif" }}>
                                {this.state.Emailerror}
                            </div> */}
                        </div>
                        <div class="container">
                            {/* <span class="icon"><i class="fas fa-lock"></i></span> */}
                            <input type="text" value={this.state.content} onChange={this.onChangecontent} placeholder="content" />
                            {/* <div style={{ fontSize: 12, color: "red", fontVariantCaps: "titling-caps", fontFamily: "sans-serif" }}> */}
                            {/* {this.state.Passworderror} */}
                            {/* </div> */}
                        </div>
                        <div class="container">
                            <label>
                                <input type="checkbox" value={this.state.ispriority} onChange={this.onchangepriority} />
                                Priority
                            </label>
                        </div>
                        <div class="container">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStatetoProps(state) {
    console.log(state)
    return {
        authenticated: state.auth.authenticated,
    }
}

export default connect(mapStatetoProps)(PostNew);