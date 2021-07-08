import axios from 'axios';
import React, { Component } from 'react';
export default class forgotpassword extends Component {

    constructor(props) {
        super(props)

        this.onSubmit1 = this.onSubmit1.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.onChangeenteredotp = this.onChangeenteredotp.bind(this);

        this.state = {
            email: '',
            enteredotp: '',
            receivedotp:''
        }
    }

    onChangeemail(e) {
        this.setState({ email: e.target.value })
    }


    onChangeenteredotp(e) {
        this.setState({ enteredotp: e.target.value })
    }

    onSubmit1 = (event) => {
        event.preventDefault()
        axios.post('http://localhost:5000/find',{
            "Email" : this.state.email                        
        })
        .then((res)=>{
            if(res.data.length  === 0)
            {
                alert("no such account exists!")
            }
            else {
                axios({
                    method: "POST",
                    url: "http://localhost:5000/send",
                    data: {
                        email: this.state.email
                    }
                }).then((response) => {
                    if (response.data.msg === 'success') {
                        this.setState({
                            receivedotp: response.data.otp
                        })
                    } else if (response.data.msg === 'fail') {
                        alert("Oops, something went wrong. Try again")
                    }
                })
            }
        })
    }
    
    onSubmit2 = (event) => {
        event.preventDefault()
        var enteredotp = parseInt(this.state.enteredotp)
        var receivedotp = parseInt(this.state.receivedotp)
        if(receivedotp === enteredotp)
        {
            this.props.history.push({
                pathname: '/resetpwd',
                state: { email : this.state.email }
            });
        }
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <form>
                    <div>
                        <label>Enter Email:</label>
                        <input type="text" value={this.state.email} onChange={this.onChangeemail}></input><br></br>
                        <button onClick={this.onSubmit1} >Submit</button>
                        <br />
                        <label>Enter Otp:</label>
                        <input type="text" value={this.state.enteredotp} onChange={this.onChangeenteredotp}></input><br></br>
                        <button onClick={this.onSubmit2} >Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}