import { SET_PREV_PATH } from '../types/savePrevPath';

export const setPrevPath = path => {
  return {
    type: SET_PREV_PATH,
    prevPath: path,
  };
}