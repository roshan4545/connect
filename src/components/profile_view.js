import axios from 'axios';
import React, { Component } from 'react';
import Reload from "./reload"
class profile_view extends Component {

    constructor(props)
    {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name : '',
            dob : '',
            gender : '',
            email : '',
            department : '',
            description : ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
        .then((res)=>{
            this.setState({
                name : res.data.Name,
                dob : res.data.dob,
                gender : res.data.gender,
                email : res.data.Email, 
                department : res.data.department,
                description : res.data.description
            })
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.history.push({
            pathname: '/updateprofile',
        });
    }

    render() {
        return (
            <div>
                <Reload />
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <p>Name: {this.state.name}</p>
                <p>DOB: {this.state.dob}</p>
                <p>Gender: {this.state.gender}</p>
                <p>Email: {this.state.email}</p>
                <p>Department: {this.state.department}</p>
                <p>Description: {this.state.description}</p>


                <button onClick={this.onSubmit}>Update profile</button>
            </div>
        );
    }
}

export default profile_view;