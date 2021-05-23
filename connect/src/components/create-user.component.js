import React, { Component } from 'react';
import axios from 'axios';
import "./Signup.css";
import Header from "./header";
import Helmet from 'react-helmet';
import { connect } from "react-redux";

class CreateUser extends Component {


    componentDidMount()
    {
        if(this.props.authenticated)
        {
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
        this.state = {
            Email: '',
            Password: '',
            Emailerror: '',
            Name: '',
            Confirm: '',
            department: '',
            otp: ''
        }
    }


    onChangeEmail(e) {
        this.setState({ Email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ Password: e.target.value })
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
                department: this.state.department
            };


            axios.post('http://localhost:5000/find', {
                "Email": userObject.Email
            })
            if (this.state.Password !== this.state.Confirm) {
                document.getElementById("notmatch").style.display = "block";
            }
            else {
                document.getElementById("notmatch").style.display = "none";
                axios.post('http://localhost:5000/find', {
                    "Email": userObject.Email
                })
                    .then((res) => {
                        // console.log(res.data.length)
                        if (res.data.length > 0) {
                            // alert("You already have an account")
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
                                    // console.log(response.data);
                                    this.setState({
                                        otp: response.data.otp
                                    })
                                    this.props.history.push({
                                        pathname: '/Checkout',
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


//         const token = localStorage.getItem("token")

// if(token !== null)
// {
//   axios.get('http://localhost:5000/token', { headers: {"Authorization" : `Bearer ${token}`} })
//   .then((res) => {
//     //   console.log(typeof res.data)
//     //   console.log(typeof true)
//       if(res.data === true)
//       {
//           console.log('sucess')
//       }
//   })
// }

        return (
            <div>
                <Header />
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
                            <p id="notmatch" style={{ display: "none" }}> The Passwords does not Match </p>
                            <p id="incorrect" style={{ display: "none" }}> Your account already exists </p>

                        </div>
                        <input type="submit" value="Register" />

                    </form>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
                        {/* <script>
                    {`
                        var form = document.getElementById('form'); 

                        form.addEventListener('mousemove', (e) =>{ 
                            var x = (window.innerWidth / 2 - e.pageX) / 12; 
                            var y = (window.innerHeight / 2 - e.pageY) / 12;
                            form.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
                    }); 
                    console.log("sai");
                    form.addEventListener('mouseleave', function(){
                            form.style.transform = 'rotateX(0deg) rotateY(0deg)';
                    })
                    `}
                </script> */}
                    </Helmet>
                </div>
            </div>
        )
    }

}


function mapStatetoProps(state) {
    console.log(state)
    return {
        authenticated : state.auth.authenticated,
        username :state.auth.username
    }
}

export default connect(mapStatetoProps)(CreateUser);