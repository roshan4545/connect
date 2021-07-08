import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import "./Loginstyle.css"
import forgotpwd from "./forgotpassword";
import Header from "./header";
import Pageloader from "./PageLoader"
import { hideLoader, showLoader } from '../actions';
import Cookies from 'universal-cookie';


const cookies = new Cookies();
axios.defaults.withCredentials = true;


class Login extends Component {
    componentDidMount() {

        if (this.props.authenticated) {
            this.props.history.replace('/posts');
        }
    }

    update = () => {
        this.props.dispatch(showLoader())
        setTimeout(() => {
            this.props.dispatch(hideLoader())
        },3000);
    }
    
    constructor(props) {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onforgotpwd = this.onforgotpwd.bind(this);
        this.state = {
            Email: '',
            Password: '',
            isSignedin: false,
        }
    }

    onChangeEmail(e) {
        this.setState({ Email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ Password: e.target.value })
    }


    onforgotpwd() {
        this.props.history.push({
            pathname: '/forgotpwd',
        });
    }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            Email: this.state.Email,
            Password: this.state.Password
        };

        axios.post('http://localhost:5000/find', {
            "Email": userObject.Email,
        })
            .then((res) => {
                if (res.data.length === 0) {
                    document.getElementById("incorrect").style.display = "block";
                }
                else {
                    const userdet = {
                        enterpass: userObject.Password,
                        retpass: res.data[0].Password,
                        email: userObject.Email
                    };
                    axios.post('http://localhost:5000/login', userdet)
                        .then((res) => {
                            if (res.data.status === 'success') {
                                localStorage.setItem('token', res.data.token)
                                axios.get('http://localhost:5000/token', { headers: { "Authorization": `Bearer ${res.data.token}` } })
                                    .then((res) => {
                                        console.log(res.data);
                                    })
                                    .catch((error) => {
                                        console.log(error.response.data);
                                    });
                                this.props.history.push('/posts')
                            }
                            else {
                                console.log('entered wrong password')
                            }
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
                <div class="login-div">

                    <form onSubmit={this.onSubmit}>
                        <div class="logo"></div>
                        <div class="title">Sign In</div> <div class="sub-title">Use your college mail </div>
                        <div class="fields">
                            <div class="username">
                                <input type="username" value={this.state.Email} onChange={this.onChangeEmail} class="user-input" placeholder="email" />
                            </div>
                            <div class="password" >
                                <input type="password" value={this.state.Password} onChange={this.onChangePassword} class="pass-input" placeholder="password" />
                            </div>
                        </div>
                        <div>
                            <p id="incorrect" style={{ display: "none" }}> The details entered are incorrect </p>
                        </div>
                        <button class="signin-button" onClick={this.update} >Login</button>
                        <div class="link">
                            <a href="http://localhost:3000/forgotpwd">Forgot password</a>or <a href="http://localhost:3000/signin">Sign up</a>
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