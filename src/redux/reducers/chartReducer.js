import produce from "immer";
import { CHART, CHART_SUCCESS, CHART_FAILED } from "../constants/charts";

export const initialState = {
  charts: [],
  statusFlags: {
    isLoading: false,
    isChartFailure: false,
    isChartSuccess: false,
  },
  logs: {
    err: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const chartReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHART: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case CHART_SUCCESS: {
        draft.charts = action.payload;
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isChartSuccess = true;
        draft.statusFlags.isChartFailure = false;
        break;
      }
      case CHART_FAILED: {
        draft.logs.err = action.message;
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isChartSuccess = false;
        draft.statusFlags.isChartFailure = true;
        break;
      }
    }
  });

export default chartReducer;
