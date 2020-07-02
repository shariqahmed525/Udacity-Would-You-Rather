import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import usersReducer from './usersReducer';
import questionsReducer from './questionsReducer';
import authedUserReducer from './authedUserReducer';

const reducers = combineReducers({
  users: usersReducer,
  questions: questionsReducer,
  authedUser: authedUserReducer,
  loadingBar: loadingBarReducer,
});

export default reducers;