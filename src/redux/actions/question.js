import {
  GET_QUESTION,
  GET_QUESTION_FAILED,
  GET_QUESTION_SUCCESS,
} from "../constants/question";

// GET CHART
export const getQuestion = () => {
  return {
    type: GET_QUESTION,
  };
};
export const getQuestionSuccess = (payload) => {
  return {
    type: GET_QUESTION_SUCCESS,
    payload,
  };
};
export const getQuestionFaiure = (message) => {
  return {
    type: GET_QUESTION_FAILED,
    message,
  };
};
