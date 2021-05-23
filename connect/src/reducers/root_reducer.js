import { combineReducers } from 'redux';


import authReducer from './auth_reducer';
import postsReducer from './posts_reducer';

const rootReducer = combineReducers({
    // form: formReducer,  // the form property of state is going to be produced by ReduxForm reducer
    auth: authReducer,
    // profile: profileReducer,
    posts: postsReducer,
    // comments: commentsReducer,
});

export default rootReducer;