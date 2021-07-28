import {
  CHART,
  CHART_FAILED,
  CHART_SUCCESS,
  POST_CHART,
  POST_CHART_FAILED,
  POST_CHART_SUCCESS,
  UPDATE_CHART,
  UPDATE_CHART_FAILED,
  UPDATE_CHART_SUCCESS,
} from "../constants/charts";

// GET CHART
export const getChart = () => {
  return {
    type: CHART,
  };
};
export const getChartSuccess = (payload) => {
  return {
    type: CHART_SUCCESS,
    payload,
  };
};
export const getChartFaiure = (message) => {
  return {
    type: CHART_FAILED,
    message,
  };
};
// POST CHART
export const postChart = (chartInfo) => {
  return {
    type: POST_CHART,
    chartInfo,
  };
};
export const postChartSuccess = (payload) => {
  return {
    type: POST_CHART_SUCCESS,
    payload,
  };
};
export const postChartFaiure = (message) => {
  return {
    type: POST_CHART_FAILED,
    message,
  };
};

// POST CHART
export const updateChart = (chartInfo) => {
  return {
    type: UPDATE_CHART,
    chartInfo,
  };
};
export const updateChartSuccess = (payload) => {
  return {
    type: UPDATE_CHART_SUCCESS,
    payload,
  };
};
export const updateChartFaiure = (message) => {
  return {
    type: UPDATE_CHART_FAILED,
    message,
  };
};
