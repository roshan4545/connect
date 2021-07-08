import React, { Component } from 'react';
import axios from 'axios';
import "./Signup.css";
import Header from "./header";
import Helmet from 'react-helmet';
import { connect } from "react-redux";
import { showLoader, hideLoader } from '../actions';

class CreateUser extends Component {

    update = () => {

        // window.location.reload(false);
        this.props.dispatch(showLoader())
        // this.setState({});
        setTimeout(() => {
            this.props.dispatch(hideLoader())
        }, 3000);
    }

    componentDidMount() {
        if (this.props.authenticated) {
            this.props.history.replace('/posts');
        }
    }

    constructor(props) {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeConfirm = this.onChangeConfirm.bind(this);
        this.onChangedepartment = this.onChangedepartment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangerole = this.onChangerole.bind(this);
        this.state = {
            Email: '',
            Password: '',
            Emailerror: '',
            Name: '',
            Confirm: '',
            department: '',
            otp: '',
            role: ''
        }
    }


    onChangeEmail(e) {
        this.setState({ Email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ Password: e.target.value })
    }

    onChangerole(event) {
        this.setState({
            role: event.target.value
        });
    }

    validate = () => {
        let Emailerror = "";
        let Passworderror = "";
        if (!this.state.Email.includes("@uceou.edu")) {
            this.setState({
                Emailerror: "Confined to uceou.edu account holders"
            })
            return 0;
        }
        if (this.state.Password.length < 8) {
            this.setState({
                Passworderror: "Min. 8 characters"
            })
            return 0;
        }
        return 1;
    }
    onChangedepartment(e) {
        this.setState({ department: e.target.value.toUpperCase() })
    }
    onChangeName(e) {
        this.setState({ Name: e.target.value })
    }

    onChangeConfirm(e) {
        this.setState({ Confirm: e.target.value })
    }




    onSubmit(e) {
        e.preventDefault()
        if (this.validate()) {
            var userObject = {
                Email: this.state.Email,
                Password: this.state.Password,
                Name: this.state.Name,
                department: this.state.department,
                isverified: false,
                role: this.state.role
            };

            if (this.state.Password !== this.state.Confirm) {
                document.getElementById("notmatch").style.display = "block";
            }
            else {
                document.getElementById("notmatch").style.display = "none";
                axios.post('http://localhost:5000/find', {
                    "Email": userObject.Email
                })
                    .then((res) => {
                        if (res.data.length > 0) {
                            document.getElementById("incorrect").style.display = "block";
                        }
                        else if (res.data.length === 0) {
                            axios({
                                method: "POST",
                                url: "http://localhost:5000/send",
                                data: {
                                    name: userObject.Name,
                                    email: userObject.Email
                                }
                            }).then((response) => {
                                if (response.data.msg === 'success') {
                                    this.setState({
                                        otp: response.data.otp
                                    })
                                    this.props.history.push({
                                        pathname: '/Checkotp',
                                        state: { detail: userObject, otp: this.state.otp }
                                    });
                                } else if (response.data.msg === 'fail') {
                                    alert("Oops, something went wrong. Try again")
                                }
                            }).catch((error) => {
                                console.log(error);
                            })
                        }
                    }).catch((error) => {
                        console.log(error)
                    });

                // this.setState({ Email: '', Password: '' })
                this.setState({ Email: '', Password: '', Emailerror: '', Name: '', Confirm: '', department: '' });

            }
        }
    }



    render() {
        return (
            <div>
                <Header />
                <br />
                <br></br>
                <br></br>
                <div class="form-container">


                    <form onSubmit={this.onSubmit} id="form">
                        <h3>Sign Up</h3>
                        <div class="container">
                            <span class="icon"><i class="fas fa-user"></i></span>
                            <input type="text" value={this.state.Name} onChange={this.onChangeName} placeholder="username"></input>
                        </div>
                        <div class="container">
                            <span class="icon"><i class="fas fa-at"></i></span>
                            <input type="email" value={this.state.Email} onChange={this.onChangeEmail} placeholder="email"></input>
                            <div style={{ fontSize: 12, color: "red", fontVariantCaps: "titling-caps", fontFamily: "sans-serif" }}>
                                {this.state.Emailerror}
                            </div>
                        </div>
                        <div class="container">
                            <span class="icon"><i class="fas fa-lock"></i></span>
                            <input type="password" value={this.state.Password} onChange={this.onChangePassword} placeholder="password" />
                            <div style={{ fontSize: 12, color: "red", fontVariantCaps: "titling-caps", fontFamily: "sans-serif" }}>
                                {this.state.Passworderror}
                            </div>
                        </div>
                        <div class="container">
                            <span class="icon"><i class="fas fa-lock"></i></span>
                            <input type="password" value={this.state.Confirm} onChange={this.onChangeConfirm} placeholder="Confirm Password" />

                            <div class="container">
                                <span class="icon"><i class='fas fa-users'></i></span>
                                <input type="text" list="data" onChange={this.onChangerole} placeholder="Role" />
                                <datalist id="data">
                                    {
                                        <option value="Student" />
                                    }
                                    {
                                        <option value="Professor" />
                                    }
                                    {
                                        <option value="CR" />
                                    }
                                </datalist>
                            </div>
                            <p id="notmatch" style={{ display: "none" }}> The Passwords does not Match </p>
                            <p id="incorrect" style={{ display: "none" }}> Your account already exists </p>

                        </div>
                        <input type="submit" onClick={this.update} value="Register" />
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

export default connect(mapStatetoProps)(CreateUser);