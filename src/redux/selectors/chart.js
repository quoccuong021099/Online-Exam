import { createSelector } from "reselect";
import { initialState } from "../reducers/chartReducer";

/**
 * Direct selector to the app state domain
 */

const selectChartDomain = (state) => {
  return state.keyChart || initialState;
};

const makeSelectChart = () =>
  createSelector(selectChartDomain, (substate) => substate.charts);

const makeSelectPostChart = () =>
  createSelector(makeSelectChart, (substate) => substate.charts);

const makeSelectIsSuccessChart = () =>
  createSelector(selectChartDomain, (substate) => substate.statusFlags);

const makeSelectError = () =>
  createSelector(selectChartDomain, (substate) => substate.logs);

export {
  makeSelectChart,
  makeSelectIsSuccessChart,
  makeSelectError,
  makeSelectPostChart,
};
