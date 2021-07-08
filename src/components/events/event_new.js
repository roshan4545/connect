import React, { Component } from 'react';
import axios from 'axios';
import Header from "../header";


class PostNew extends Component {

    constructor(props) {
        super(props)

        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangecontent = this.onChangecontent.bind(this);
        this.onchangepriority = this.onchangepriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            title: '',
            categories: '',
            ispriority: false,
            postedby: ''
        }
    }



    onChangetitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangecontent(e) {
        this.setState({ content: e.target.value })
    }

    onchangepriority(e) {
        this.setState({
            ispriority: !(this.state.ispriority)
        })
    }

    changestringtoarray() {
        this.setState({
            categories: this.state.categories.split(',')
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const formdet = {
            title: this.state.title,
            content: this.state.content
        }

        const token = localStorage.getItem('token')
        axios.post('http://localhost:5000/api/createevent', formdet, {
            headers: { "Authorization": `Bearer ${token}` }
        })

        if (this.state.ispriority == true) {

            axios.get('http://localhost:5000/userdetails', {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then((res) => {
                    axios.post('http://localhost:5000/users')
                        .then((resp) => {
                            var name = res.data.Name
                            var len = resp.data.length
                            for (let index = 0; index < len; index++) {
                                axios.post('http://localhost:5000/sendpriorityevent', {
                                    postedby: name,
                                    email: resp.data[index].Email
                                })
                            }
                        })
                })
        }

    }




    render() {
        return (
            <div>
                <Header />
                <div class="form-container">
                    <form onSubmit={this.onSubmit} id="form">
                        <h3>New Event</h3>
                        <div class="container">
                            <input type="text" value={this.state.title} onChange={this.onChangetitle} placeholder="title"></input>
                        </div>
                        <div class="container">
                            <input type="text" value={this.state.content} onChange={this.onChangecontent} placeholder="content" />
                        </div>
                        <div class="container">
                            <label>
                                <input type="checkbox" value={this.state.ispriority} onChange={this.onchangepriority} />
                                Priority
                            </label>
                        </div>
                        <div class="container">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default (PostNew);