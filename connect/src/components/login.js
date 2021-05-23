import React, { Component } from 'react';
import axios from 'axios';
import "./Loginstyle.css"
import Header from "./header";
import { connect } from "react-redux";
import  { Redirect } from 'react-router-dom'



class Login extends Component {
    componentDidMount()
  {
    if(this.props.authenticated === true)
    {
        return <Redirect to="/posts" />
        // console.log(this.props.authenticated)
        // this.props.history.push("/posts");
    }
  }

    constructor(props) {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Email: '',
            Password: '',
            isSignedin: false
        }
    }
    
    onChangeEmail(e) {
        this.setState({ Email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ Password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            Email: this.state.Email,
            Password: this.state.Password
        };
        
        axios.post('http://localhost:5000/find',{
            "Email": userObject.Email,
        })
        .then((res) => {
            if(res.data.length === 0 )
            {
                document.getElementById("incorrect").style.display = "block";
            }
            else
            {
                console.log((res.data));
                const userdet = {
                    enterpass : userObject.Password,
                    retpass : res.data[0].Password,
                    email : userObject.Email
                };
                axios.post('http://localhost:5000/login',userdet)
                .then((res) => {
                    // console.log(res.data.token);
                    // console.log(res.data.status);
                    if(res.data.status === 'success'){
                        localStorage.setItem('token',res.data.token)
                    }
                    else{
                        console.log('entered wrong password')
                    }
                                        
                    axios.get('http://localhost:5000/token', { headers: {"Authorization" : `Bearer ${res.data.token}`} })
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
                })
                .catch((error) => {
                    console.log(error.response.data)
                })
            }
        }).catch((error) => {
            console.log(error)
        });

        this.setState({ Email: '', Password: '' })
    }
      
    render() {
        return (
            <div>
                <Header />
                <br />
                <br />
            <div class="login-div">
                
                <form onSubmit={this.onSubmit}>
                <div class="logo"></div>
                <div class="title">Sign In</div> <div class="sub-title">Use your college mail </div>
                <div class="fields">
                    <div class="username">
                        <input type="username" value={this.state.Email} onChange={this.onChangeEmail} class="user-input" placeholder="email" />
                        
                    </div>
                    <div class="password" >
                         <input type="password" value={this.state.Password} onChange={this.onChangePassword}class="pass-input" placeholder="password" />
                    </div>
                </div>
                <div>
                   <p id="incorrect" style={{display: "none"}}> The details entered are incorrect </p>
                </div>
            <button class="signin-button">Login</button>
            <div class="link">
                <a href="#">Forgot password?</a> or <a href="#">Sign up</a>
            </div>
            </form>
            </div>
            </div>
        )
    }
}

function mapStatetoProps(state) {
    return {
      authenticated: state.auth.authenticated,
    }
  }
  
  export default connect(mapStatetoProps)(Login);