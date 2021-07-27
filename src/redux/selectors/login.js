import { createSelector } from "reselect";
import { initialState } from "../reducers/loginReducer";

/**
 * Direct selector to the app state domain
 */

const selectLoginDomain = (state) => {
  return state.keyLogin || initialState;
};

const makeSelectLogin = () =>
  createSelector(selectLoginDomain, (substate) => substate.users);

const makeSelectIsSuccessLogin = () =>
  createSelector(selectLoginDomain, (substate) => substate.statusFlags);
const makeSelectError = () =>
  createSelector(selectLoginDomain, (substate) => substate.logs);

export { makeSelectLogin, makeSelectIsSuccessLogin, makeSelectError };
