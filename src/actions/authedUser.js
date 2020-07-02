import { SET_AUTHED_USER } from '../types/authedUser';

export const setAuthedUser = id => {
  return {
    type: SET_AUTHED_USER,
    id
  };
}