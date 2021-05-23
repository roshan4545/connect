import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from "../../actions/index"

class PostList extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  // renderTags(tags) {
  //   return tags.map(tag => {
  //     return <span className="badge badge-info span-with-margin" key={tag}>{tag}</span>;
  //   });
  // }

  renderPostSummary(post) {
    return (
      <div key={post._id}>
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">{post.authorName}</span><br></br>
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">{new Date(post.time).toLocaleString()}</span>
        <h3>
          {/* <Link className="link-without-underline" to={`/posts/${post._id}`}> */}
            {/* {post.title} */}
          {/* </Link> */}
          <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
        </h3>
        {/* {this.renderTags(post.categories)} */}
        <hr />
      </div>
    );
  }

  render() {
    return (
      <div className="post">
        <Link className="btn btn-primary mb-5" to={'/posts/new'}>Publish A New Post</Link>
        {_.map(this.props.posts, post => {
          return this.renderPostSummary(post);
        })}
      </div>
    );
  }
}



function mapStateToProps(state) {
    console.log(state)
  return { posts: state.posts };
}

export default connect(mapStateToProps , { fetchPosts })(PostList);