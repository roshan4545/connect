import axios from 'axios';
import React, { Component } from 'react';
import { hideaccountCreated, showaccountCreated } from '../actions';
import { connect } from 'react-redux';
class checkotp extends Component {

    update = () => {
        this.props.dispatch((showaccountCreated()))
        setTimeout(() => {
            this.props.dispatch(hideaccountCreated())
        }, 6000);
    }

    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeotp = this.onChangeotp.bind(this);

        this.state = {
            otp: ''
        }
    }

    onChangeotp(e) {
        this.setState({ otp: e.target.value })
    }

    onSubmit = (st) => (event) => {
        var tempst = st
        event.preventDefault()
        var recotp = parseInt(tempst.otp)
        var otp = parseInt(this.state.otp)
        if (recotp !== otp) {
            alert("Enter the correct otp")
        }
        else {
            axios.post('http://localhost:5000/create', tempst.detail)
                .then((res) => {
                    this.props.history.push({
                        pathname : '/login'
                        // state : {detail : userObject,otp : this.state.otp}
                    });
                })
                .catch((error) => {
                    console.log(error)
                })



            setTimeout(() => {
                if (st.detail.role !== "Student") {
                    axios.post('http://localhost:5000/find',
                        {
                            "Email": tempst.detail.Email
                        })
                        .then((res) => {
                            var resp = res
                            axios.post("http://localhost:5000/verifyroles", {
                                name: resp.data[0].Name,
                                email: resp.data[0].Email,
                                userid: resp.data[0]._id
                            })
                        })
                }
            }, 4000);
        }
    }
    render() {
        const st = this.props.location.state
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <form onSubmit={this.onSubmit(st)}>
                    <div>
                        <label for="Otp">Enter Otp:</label>
                        <input type="text" value={this.state.enteredotp} onChange={this.onChangeotp}></input><br></br>
                        <input type="submit" onClick = {this.update} value="Submit" />
                    </div>
                </form>
            </div>
        )
    }
}


function mapStatetoProps(state) {
    return {
        authenticated : state.auth.authenticated,
        loading : state.auth.loading,
        accountCreated : state.auth.accountCreated
    }
}

export default connect(mapStatetoProps)(checkotp);