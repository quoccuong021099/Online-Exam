import produce from "immer";
import {
  CHART,
  CHART_SUCCESS,
  CHART_FAILED,
  POST_CHART,
  POST_CHART_FAILED,
  POST_CHART_SUCCESS,
  UPDATE_CHART,
  UPDATE_CHART_FAILED,
  UPDATE_CHART_SUCCESS,
} from "../constants/charts";

export const initialState = {
  charts: [],
  statusFlags: {
    isLoading: false,
    isChartFailure: false,
    isChartSuccess: false,
    isPostChartFailure: false,
    isPostChartSuccess: false,
    isUpdateChartFailure: false,
    isUpdateChartSuccess: false,
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
      case POST_CHART: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case POST_CHART_SUCCESS: {
        draft.charts = [...state.charts, action.payload];
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isPostChartSuccess = true;
        draft.statusFlags.isPostChartFailure = false;
        break;
      }
      case POST_CHART_FAILED: {
        draft.logs.err = action.message;
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isPostChartSuccess = false;
        draft.statusFlags.isPostChartFailure = true;
        break;
      }
      case UPDATE_CHART: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case UPDATE_CHART_SUCCESS: {
        console.log(action.payload);
        const findId = state.charts.findIndex(
          (i) => i.id === action.payload.id
        );
        if (findId !== -1) {
          draft.charts[findId] = action.payload;
          draft.statusFlags.isUpdateChartSuccess = true;
        }
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isUpdateChartFailure = false;
        break;
      }
      case UPDATE_CHART_FAILED: {
        draft.logs.err = action.message;
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isUpdateChartSuccess = false;
        draft.statusFlags.isUpdateChartFailure = true;
        break;
      }
    }
  });

export default chartReducer;
