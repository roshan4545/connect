import React, { Component } from 'react'
import "./Loginstyle.css"
import { connect } from 'react-redux'
import Loadergif from  "./loader.gif";

class Signupsuccess extends Component {
state = {}

    render() {
        const {accountCreated} = this.props;

        if(!accountCreated) return null;

        return (
            <div class="loader-container">
                <div className="loader">
                    <label>Sign Up is succesful.Please log in!</label>
                </div>
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

export default connect(mapStatetoProps)(Signupsuccess);