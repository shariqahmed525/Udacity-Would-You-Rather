import { SET_PREV_PATH } from '../types/savePrevPath';

const savePrevPathReducer = (state = null, action) => {
  switch (action.type) {
    case SET_PREV_PATH:
      return action.prevPath;
    default:
      return state;
  };
}

export default savePrevPathReducer;