import React, { Component } from 'react';
import "./welcome.css";
import Header from "./header";

export default class Welcome extends Component {

    render() {
        return (
            <div>
                <div className="landing-page">
                </div>
                <div className="landing-text">
                    <h1>Connect</h1>
                    <p>A Social Media Website For OU Students.</p>
                </div>
            </div>
        )
    }
}