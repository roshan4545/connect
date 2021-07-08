import React, { Component, useEffect } from "react";
import axios from 'axios';
import "./headerstyle.css";
import Welcome from "./welcome";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import "./destination/style.css";
import { Link } from "react-router-dom"
import Reload from "./reload";
import { withRouter } from 'react-router';
import Searchtable from "./search_table";

class Header extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchval: '',
      data: []
    }
    this.signoutuser = this.signoutuser.bind(this);
    this.onchangesearchval = this.onchangesearchval.bind(this);
  }

  signoutuser(e) {
    localStorage.removeItem('token');
    window.location.reload(false);
  };

  componentDidMount() {
    if (this.props.authenticated) {
      console.log('true')
      const token = localStorage.getItem('token')
      const info = jwt.decode(token, process.env.JWT_SECRET)
      let uname = info.uname;
    }
  }

  dataTable() {
    let details = this.state.data;
    return details.map((data,i) => {
      return (
        <div className = "user" key={i}>
          <p id = "searchp"><a>{data.Name}</a></p>
        </div>
      )
    })
  }

  onchangesearchval(e) {

    this.state.data = []

    this.setState({
      searchval: e.target.value
    })

    setTimeout(() => {
      if (this.state.searchval !== '') {
        axios.post('http://localhost:5000/search', {
          text: this.state.searchval
        })
          .then((res) => {
            this.setState({
              data: res.data
            })
          })
      }
    }, 20)
  }



  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div className="navbar-nav nav-item dropdown ml-auto">
          <button class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/userprofile">Your profile</a></li>
            <li><a class="dropdown-item" href="/settings">Settings</a></li>
            <li><a class="dropdown-item" href="/settings">Reset Password</a></li>
            <li><a class="dropdown-item" href="/updateprofile">Update Profile</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" ><button onClick={this.signoutuser}> Sign out</button></a></li>
          </ul>
        </div>
      );
    } else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item" key={1}>
            <Link className="btn btn-primary" to="/signin">
              Sign Up
            </Link>
          </li>
          <li className="nav-item" key={2}>
            <Link className="btn btn-secondary ml-sm-2" to="/login">
              Sign In
            </Link>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand flex-shrink-0  navbar-dark fixed-top bg-dark">
          <div className="container">
            <a href="/" class="navbar-brand">Connect</a>
            <div
              className="collapse navbar-collapse"
              id="navbarsExampleContainer"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/posts">
                    Posts
                  </Link>
                </li>
              </ul>
              <form className="form-inline my-2 my-md-0">
                <input type="text" onChange={this.onchangesearchval} value={this.state.searchval} placeholder="Search Post" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onSubmit={this.onsubmitsearchval}> Search </button>
                <br></br>
              </form>
              <div className="ml-auto">{this.renderLinks()}</div>
            </div>
          </div>
        </nav>
        <br></br>
        <br></br>
        <br></br>
        {this.dataTable()}
      </div>
    );
  }
}


function mapStatetoProps(state) {
  console.log(state)
  return {
    authenticated: state.auth.authenticated,
  }
}

export default withRouter(connect(mapStatetoProps)(Header));