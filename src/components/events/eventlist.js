import _ from 'lodash';
import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEvents } from "../../actions/index"
import Reload from "../reload";
import axios from 'axios';

class EventList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verified : ''
    }
    this.decide = this.decide.bind(this);
  }
  componentDidMount() {
    this.decide();
    this.props.fetchEvents();
  }



  renderEventSummary(event) {
      return (
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
          <hr />
        </div>
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
    events : state.events
  };
}

export default connect(mapStateToProps, { fetchEvents })(EventList);