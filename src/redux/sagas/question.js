import axios from "axios";
import _get from "lodash/get";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import {} from "../actions/charts";
import { getQuestionFaiure, getQuestionSuccess } from "../actions/question";
import { GET_QUESTION } from "../constants/question";

function fetchQuestion() {
  return axios({
    method: "GET",
    url: "http://localhost:5000/question",
  });
}

function* questionSagaFunc() {
  try {
    const response = yield call(fetchQuestion);
    const QuestionsData = _get(response, "data", []);
    yield delay(1000);
    yield put(getQuestionSuccess(QuestionsData));
  } catch (error) {
    yield put(getQuestionFaiure(error));
  }
}

export default function* questionSaga() {
  yield takeLatest(GET_QUESTION, questionSagaFunc);
}
