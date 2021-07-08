import React, { Component } from "react";
import axios from 'axios';

class Settings extends Component {

    constructor(props) {
        super(props)

        this.state = {
            oldpwd: "",
            newpwd: "",
            confirmnewpwd: ""
        }

        this.onchangeoldpwd = this.onchangeoldpwd.bind(this);
        this.onchangenewpwd = this.onchangenewpwd.bind(this);
        this.onchangeconfirmnewpwd = this.onchangeconfirmnewpwd.bind(this);
        this.onsubmitpwd = this.onsubmitpwd.bind(this);
    }

    onchangeoldpwd(e) {
        this.setState({
            oldpwd: e.target.value,
        })
    }

    onchangenewpwd(e) {
        this.setState({
            newpwd: e.target.value,
        })
    }

    onchangeconfirmnewpwd(e) {
        this.setState({
            confirmnewpwd: e.target.value
        })
    }

    onsubmitpwd(e) {
        e.preventDefault()

        if (this.state.newpwd !== this.state.confirmnewpwd) 
        {
            alert('passwords does not match!')
        }
        else {
            const token = localStorage.getItem('token')
            axios.post('http://localhost:5000/checkpwd', {
                oldpwd: this.state.oldpwd
            },
                {
                    headers: { "Authorization": `Bearer ${token}` }
                })
                .then((res) => {
                    var id = (res.data.id)
                    axios.post('http://localhost:5000/bycryptit', {
                        content: this.state.newpwd
                    }).then((res) => {
                        var newpwd = res.data
                        axios.post(`http://localhost:5000/update/${id}`, {
                            "Password": newpwd
                        })
                    })
                })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.onsubmitpwd}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <h3>Change Password</h3><br />
                        <div>
                            <span>Old pwd:</span>
                            <input type="password" value={this.state.oldpwd} onChange={this.onchangeoldpwd} />
                        </div>
                        <div>
                            <span>New pwd:</span>
                            <input type="password" value={this.state.newpwd} onChange={this.onchangenewpwd} />
                        </div>
                        <div>
                            <span>Confirm New pwd:</span>
                            <input type="password" value={this.state.confirmnewpwd} onChange={this.onchangeconfirmnewpwd} />
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}
export default Settings;