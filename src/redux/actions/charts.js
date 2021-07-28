import { CHART, CHART_FAILED, CHART_SUCCESS } from "../constants/charts";

// Đăng nhập
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
