import axios from 'axios';
import React, { Component } from 'react';

class enterresetpwd extends Component {

    constructor(props)
    {
        super(props);
        this.onchangepwd = this.onchangepwd.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
        this.state = {
            newpwd : ''
        }
    }

    onchangepwd(e) {
        this.setState({
            newpwd : e.target.value
        })
    }


    onsubmit= (st) => (e) => {
        e.preventDefault()
        var email = st.Email
        
        axios.post('http://localhost:5000/find',{
            "Email" : email 
        }).then((res)=>{
            var id = (res.data[0]._id)
            axios.post('http://localhost:5000/bycryptit',{
                content : this.state.newpwd
            }).then((res) => {
                var newpwd = res.data
                axios.post(`http://localhost:5000/update/${id}`,{
                    "Password" : newpwd
                })
            })
        })
    }

    render() {
        const st = this.props.location.state
        return (
            <div>
                <form onSubmit={this.onsubmit(st)}>
                <label>Enter new Password:</label>
                <input type="text" value={this.state.newpwd} onChange={this.onchangepwd} />
                <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default enterresetpwd;