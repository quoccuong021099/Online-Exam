import axios from "axios";
import _get from "lodash/get";
import _find from "lodash/find";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getChartFaiure,
  getChartSuccess,
  postChartFaiure,
  postChartSuccess,
  updateChartSuccess,
} from "../actions/charts";
import { CHART, POST_CHART, UPDATE_CHART } from "../constants/charts";

function fetchChart() {
  return axios({
    method: "GET",
    url: "http://localhost:5000/charts",
  });
}

function postChart(chartInfo) {
  axios.post("http://localhost:5000/charts", chartInfo);
}
function updateChart(chartInfo) {
  axios.patch(`http://localhost:5000/charts/${chartInfo.id}`, chartInfo);
}

function* chartPostSagaFunc(chartInfo) {
  const chart = chartInfo.chartInfo;
  const response = yield call(fetchChart);
  const chartData = _get(response, "data", []);
  let testChart = _find(chartData, (i) => i.id === chart.id);
  if (!testChart) {
    yield postChart(chart);
    yield put(postChartSuccess(chart));
  } else {
    if (
      chart.point > testChart.point ||
      (chart.point === testChart.point &&
        Number(chart.time) < Number(testChart.time))
    ) {
      yield updateChart(chart);
      yield put(updateChartSuccess(chart));
    } else {
      yield put(postChartFaiure("Đã có lỗi xảy ra đồ ngốc :v"));
    }
  }
}

function* chartSagaFunc() {
  try {
    const response = yield call(fetchChart);
    const chartData = _get(response, "data", []);
    yield put(getChartSuccess(chartData));
  } catch (error) {
    yield put(getChartFaiure(error));
  }
}

export default function* chartSaga() {
  yield takeLatest(CHART, chartSagaFunc);
  yield takeLatest(POST_CHART, chartPostSagaFunc);
  yield takeLatest(UPDATE_CHART, chartPostSagaFunc);
}
