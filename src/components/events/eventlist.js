import _ from 'lodash';
import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEvents } from "../../actions/index"
import Reload from "../reload";
import axios from 'axios';
// import "./style.css";

class EventList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verified: ''
    }
    this.decide = this.decide.bind(this);
    this.checkout = this.checkout.bind(this);
  }
  componentDidMount() {
    this.decide();
    this.props.fetchEvents();
  }

  checkout(title) {
    axios.post("http://localhost:5000/create-checkout-session" , {
      name : title,
    })
  }


  renderEventSummary(event) {
    return (
      <React.Fragment>
        <head>
          <script src="https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch" />
          <script src="https://js.stripe.com/v3/" />
        </head>
        <div key={event._id}>

          {/* {this.renderTags(post.categories)} */}
          <span>Title: {event.title}</span><br />
          <span className="span-with-margin text-grey"> • </span>
          <span className="span-with-margin text-grey">Author: {event.authorName}</span><br />
          <span className="span-with-margin text-grey"> • </span>
          <span className="span-with-margin text-grey">{new Date(event.time).toLocaleString()}</span>
          <h3>
            <div className="text-justify" dangerouslySetInnerHTML={{ __html: event.content }} />
          </h3>
            <form onSubmit={this.checkout(event.title)} method="POST">
              <button type="submit">Checkout</button>
            </form>
          <hr />
        </div>
      </React.Fragment>
    );
  }

  decide() {

    setTimeout(() => {
      axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
        .then((res) => {
          if (res.data.isverified === "true") {
            this.setState({
              verified: true
            })
          }
        })
    }, 200);
  }

  render() {
    return (
      <div>
        <Reload />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="event">
          {this.state.verified === true && <Link className="btn btn-primary mb-5" to={'/postnew'}>Create a new Event</Link>}
          {_.map(this.props.events, event => {
            return this.renderEventSummary(event);
          })}
        </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
  console.log(state)
  return {
    authenticated: state.auth.authenticated,
    events: state.events
  };
}

export default connect(mapStateToProps, { fetchEvents })(EventList);