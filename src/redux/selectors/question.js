import { createSelector } from "reselect";
import { initialState } from "../reducers/questionReducer";

/**
 * Direct selector to the app state domain
 */

const selectQuestionDomain = (state) => {
  return state.keyQuestion || initialState;
};

const makeSelectQuestion = () =>
  createSelector(selectQuestionDomain, (substate) => substate.questions);

const makeSelectIsSuccessQuestion = () =>
  createSelector(selectQuestionDomain, (substate) => substate.statusFlags);

const makeSelectQuestionError = () =>
  createSelector(selectQuestionDomain, (substate) => substate.logs);

export {
  makeSelectQuestion,
  makeSelectQuestionError,
  makeSelectIsSuccessQuestion,
};
