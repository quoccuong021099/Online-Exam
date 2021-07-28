import { all } from "redux-saga/effects";
import chartSaga from "./chart";
import loginSaga from "./login";
import questionSaga from "./question";

export default function* rootSaga() {
  yield all([loginSaga(), chartSaga(), questionSaga()]);
}
