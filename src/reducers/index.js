import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import usersReducer from './usersReducer';
import questionsReducer from './questionsReducer';
import authedUserReducer from './authedUserReducer';
import savePrevPathReducer from './savePrevPathReducer';

const reducers = combineReducers({
  users: usersReducer,
  questions: questionsReducer,
  authedUser: authedUserReducer,
  loadingBar: loadingBarReducer,
  savePrevPath: savePrevPathReducer,
});

export default reducers;