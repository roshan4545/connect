import axios from 'axios';
import {
  AUTH_USER,
  FETCH_POSTS,
  CREATE_POST
} from './types';

export function fetchPosts() {
  return function(dispatch) {
    axios.get('http://localhost:5000/api/post/')
    .then((res) => {
      dispatch({
        type: FETCH_POSTS,
        payload: res.data,
      });
    });
  }
}

export function createPost({ title, categories, content }, historyPush, historyReplace) {

  return function(dispatch) {
    axios.post('http://localhost:5000/api/createpost/', {
      title,
      categories,
      content,
    }, {
      headers: {authorization: localStorage.getItem('token')},  // require auth
    })
      .then((response) => {  // If create post succeed, navigate to the post detail page
        dispatch({
          type: CREATE_POST,
          payload: response.data,
        });
      })
      .catch((response) => {  // If create post failed, alert failure message
        historyReplace('/posts/new', {
          time: new Date().toLocaleString(),
          // message: response.data.message,
        });
      });
  }
}