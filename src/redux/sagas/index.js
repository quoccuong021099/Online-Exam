import { all } from "redux-saga/effects";
import loginSaga from "./login";

export default function* rootSaga() {
  yield all([loginSaga()]);
}
