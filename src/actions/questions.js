import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { updateUserAnswer } from './users';
import { showLoading, hideLoading } from 'react-redux-loading';
import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_QUESTION_ANSWER } from '../types/questions';

export const receiveQuestions = questions => {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export const addQuestion = question => {
  return {
    type: ADD_QUESTION,
    question
  };
}

export const handleAddQuestion = (optionOneText, optionTwoText) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .catch(e => console.log(e, " got error in handleAddQuestion action"))
      .finally(() => dispatch(hideLoading()));
  };
}

export const addQuestionAnswer = (authedUser, qid, answer) => {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  };
}

export const handleAddQuestionAnswer = (qid, answer) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(() => {
        dispatch(updateUserAnswer(authedUser, qid, answer))
        dispatch(addQuestionAnswer(authedUser, qid, answer))
      })
      .catch(e => console.log(e, " got error in handleAddQuestionAnswer action"))
      .finally(() => dispatch(hideLoading()));
  };
}