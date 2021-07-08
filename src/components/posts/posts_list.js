import _ from 'lodash';
import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from "../../actions/index"
import Reload from "../reload";
import axios from 'axios';

class PostList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verified: '',
      signedin: ''
    }
    this.decide = this.decide.bind(this);
  }
  componentDidMount() {
    this.decide();
    this.props.fetchPosts();
  }

  renderTags(tags) {
    return tags.map(tag => {
      return <span className="" key={tag}>{tag}</span>;
    });
  }


  renderPostSummary(post) {
    return (
      <div key={post._id}>

        {/* {this.renderTags(post.categories)} */}
        <span>Title: {post.title}</span><br />
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">Author: {post.authorName}</span><br />
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">{new Date(post.time).toLocaleString()}</span>
        <h3>
          {/* <Link className="link-without-underline" to={`/posts/${post._id}`}>
            {post.title}
          </Link> */}
          <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
        </h3>
        {this.state.signedin === true && <Link className="link-without-underline" to={`/commentnew/${post._id}`}> Comment </Link>}
        <br />
        <Link className="link-without-underline" to={`/comments/${post._id}`}> View Comments </Link>
        <hr />
      </div>
    );
  }

  decide() {
    axios.get('http://localhost:5000/token', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => {
        if (res.data === true) {
          this.setState({
            signedin: true
          })
        }
      })
      .catch((error) => {
        // this.state.message = error.response.data.message
      });


    setTimeout(() => {
      if (this.state.signedin === true) {
        axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
          .then((res) => {
            if (res.data.isverified === "true") {
              this.setState({
                verified: true
              })
            }
          })
      }
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
        <div className="post">
          {this.state.verified === true && <Link className="btn btn-primary mb-5" to={'/postnew'}>Publish A New Post</Link>}
          {_.map(this.props.posts, post => {
            return this.renderPostSummary(post);
          })}
        </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    posts: state.posts
  };
}

export default connect(mapStateToProps, { fetchPosts })(PostList);