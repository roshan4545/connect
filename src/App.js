import './App.css';

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import axios from 'axios';

import Header from "./components/header"
import CreateUser from "./components/create-user.component";
import Users from "./components/users.component";
import Login from "./components/login"
import EventList from "./components/events/eventlist";
import EventNew from "./components/events/event_new"
import Resetpwd from "./components/enterresetpwd"
import Checkotp from "./components/checkotp";
import Welcome from "./components/welcome";
import PostList from "./components/posts/posts_list"
import Postnew from "./components/posts/posts_new"
import Forgotpwd from "./components/forgotpassword"
import CommentNew from "./components/posts/posts_detail/comment_new"
import Settings from "./components/settings";
import Comments from "./components/posts/posts_detail/comments";
import ProfilewithId from "./components/ProfilewithId"
import UserProfile from "./components/profile_view";
import Updateprofile from "./components/profile_update"
import Pageloader from './components/PageLoader';
import Signupsuccess from './components/Signupsuccess';
import reducers from "./reducers/root_reducer";
import { AUTH_USER } from "./actions/types";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);


const token = localStorage.getItem("token")

if (token !== null) {
  axios.get('http://localhost:5000/token', { headers: { "Authorization": `Bearer ${token}` } })
    .then((res) => {
      if (res.data === true) {
        store.dispatch({ type: AUTH_USER })
      }
    })
    .catch((error) => {
      console.log(error.response.data)
    });
}
else {
  console.log(token + "  po");
  console.log("bekaar");
}


function App() {
  return (
    <Provider store={store} >
      <Router>
        <div>
          <Header />
          <div>
            <Route exact path="/" component={Welcome} />
          </div>
          <div clasname="container" id="content">
            <switch>
              <Route exact path="/" component={Welcome} />
              <Route path="/signin" component={CreateUser} />
              <Route path="/login" component={Login} />
              <Route path="/admin" component={Users} />
              <Route path="/checkotp" component={Checkotp} />
              <Route path="/posts" component={PostList} />
              <Route path="/postnew" component={Postnew} />
              <Route path="/commentnew/:id" component={CommentNew} />
              <Route path="/settings" component={Settings} />
              <Route path="/comments/:id" component={Comments} />
              <Route path="/forgotpwd" component={Forgotpwd} />
              <Route path="/resetpwd" component={Resetpwd} />
              <Route path="/userprofile" component={UserProfile} />
              <Route path="/profile/:id" component={ProfilewithId} />
              <Route path="/updateprofile" component={Updateprofile} />
              <Route path="/events" component={EventList} />
              <Route path="/eventnew" component={EventNew} />
              <Pageloader />
              <Signupsuccess />
            </switch>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App;