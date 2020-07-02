import { RECEIVE_USERS, UPDATE_USER_ANSWER } from '../types/users';

export const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export const updateUserAnswer = (authedUser, qid, answer) => {
  return {
    type: UPDATE_USER_ANSWER,
    authedUser,
    qid,
    answer
  };
}