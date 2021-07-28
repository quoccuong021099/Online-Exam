import produce from "immer";
import {
  GET_QUESTION,
  GET_QUESTION_SUCCESS,
  GET_QUESTION_FAILED,
} from "../constants/question";

export const initialState = {
  questions: [],
  chooseQuestion: [],
  statusFlags: {
    isLoading: false,
    isQuestionFailure: false,
    isQuestionSuccess: false,
    isChooseQuestionSuccess: false,
  },
  logs: {
    err: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const chartReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_QUESTION: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case GET_QUESTION_SUCCESS: {
        draft.questions = action.payload;
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isQuestionSuccess = true;
        draft.statusFlags.isQuestionFailure = false;
        break;
      }
      case GET_QUESTION_FAILED: {
        draft.logs.err = action.message;
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isQuestionSuccess = false;
        draft.statusFlags.isQuestionFailure = true;
        break;
      }
    }
  });

export default chartReducer;
