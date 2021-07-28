import axios from "axios";
import _get from "lodash/get";
import { call, put, takeLatest } from "redux-saga/effects";
import { getChartFaiure, getChartSuccess } from "../actions/charts";
import { CHART } from "../constants/charts";

function fetchChart() {
  return axios({
    method: "GET",
    url: "http://localhost:5000/charts",
  });
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
}
