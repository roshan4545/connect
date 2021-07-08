import React, { Component } from 'react';
import axios from 'axios';
class profile_update extends Component {

    constructor(props) {
        super(props);
        this.onchangedob = this.onchangedob.bind(this);
        this.onChangegender = this.onChangegender.bind(this);
        this.onchangedepartment = this.onchangedepartment.bind(this);
        this.onchangedescription = this.onchangedescription.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
        this.state = {
            dob: '',
            gender: '',
            department: '',
            description: ''
        }
    }


    onChangegender(event) {
        this.setState({
          gender: event.target.value
        });
      }

    onchangedob(e) {
        this.setState({
            dob: e.target.value,
        })
    }

    onchangedepartment(e) {
        this.setState({
            department : e.target.value
        })
    }

    onchangedescription(e) {
        this.setState({
            description : e.target.value
        })
    }

    onsubmit(e) {
        e.preventDefault()

        axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
        .then((res)=>{
            var id = res.data._id 
            axios.post(`http://localhost:5000/update/${id}`,{
                "dob" : this.state.dob,
                "gender" : this.state.gender,
                "department" : this.state.department,
                "description" : this.state.description
            })
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <form onSubmit={this.onsubmit}>
                    <label>Gender: </label>
                    <input type="radio" value="male" checked={this.state.gender === "male"} onChange={this.onChangegender} /> Male
                    <input type="radio" value="female" checked={this.state.gender === "female"} onChange={this.onChangegender} /> Female
                    <br />
                    <label>Department: </label>
                    <input type="text" value={this.state.department} onChange={this.onchangedepartment} /> 
                    <br />
                    <label>Description: </label>
                    <input type="text" value={this.state.description} onChange={this.onchangedescription} /> 
                    <br />
                    <label>DOB: </label>
                    <input type="date" value={this.state.dob} onChange={this.onchangedob} /><br /><br />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default profile_update;