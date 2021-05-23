import React, { Component } from 'react';
import axios from 'axios';
// import Header from "./header";
import Helmet from 'react-helmet';
import { connect } from "react-redux";

class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangecategories = this.onChangecategories.bind(this);
        this.onChangecontent = this.onChangecontent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            title : '',
            categories : '',
            content : ''
        }
    }


    onChangetitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangecategories(e) {
        this.setState({ categories: e.target.value })
    }

    onChangecontent(e){
        this.setState({ content: e.target.value })
    }

    changestringtoarray() {
        this.setState({
            categories : this.state.categories.split(',')
        })
    }

    onSubmit(e) {
        e.preventDefault()

        // console.log(this.state.title,this.state.categories,this.state.content)

        const formdet = {
            title : this.state.title,
            categories : this.state.categories,
            content : this.state.content
        }
        axios.post('http://localhost:5000/api/createpost',formdet)
    }




    render() {
        return (
            <div>
                <div class="form-container">


                    <form onSubmit={this.onSubmit} id="form">
                        <h3>Sign Up</h3>
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
                            {/* <div style={{ fontSize: 12, color: "red", fontVariantCaps: "titling-caps", fontFamily: "sans-serif" }}>
                                {this.state.Passworderror}
                            </div> */}
                        </div>
                        {/* <div class="container">
                            <span class="icon"><i class="fas fa-lock"></i></span>
                            <input type="password" value={this.state.Confirm} onChange={this.onChangeConfirm} placeholder="Confirm Password" />
                            <p id="notmatch" style={{ display: "none" }}> The Passwords does not Match </p>
                            <p id="incorrect" style={{ display: "none" }}> Your account already exists </p>

                        </div> */}
                        <input type="submit" value="Submit" />

                    </form>
                </div>
            </div>
        )
    }
}

function mapStatetoProps(state) {
    // console.log(state)
    return {
        authenticated : state.auth.authenticated,
        username :state.auth.username
    }
}

export default connect(mapStatetoProps)(CreateUser);