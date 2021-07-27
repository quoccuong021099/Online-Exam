import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_USER, LOGOUT_USER } from "../constants/login";
import _get from "lodash/get";
import _find from "lodash/find";
import { loginUserFaiure, loginUserSuccess } from "../actions/login";

function fetchUser() {
  return axios({
    method: "GET",
    url: "http://localhost:5000/users",
  });
}

function* loginSagaFunc(userInfo) {
  const user = userInfo.userInfo;
  const response = yield call(fetchUser);
  const userData = _get(response, "data", []);
  let testUser = _find(
    userData,
    (i) => i.username === user.username && i.password === user.password
  );
  if (testUser) {
    localStorage.setItem("user-info", JSON.stringify(testUser));
    yield put(loginUserSuccess(testUser));
  } else {
    yield put(loginUserFaiure("Tài khoản chưa được đăng ký"));
  }
}
function* logoutSagaFunc() {
  yield localStorage.removeItem("user-info");
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_USER, loginSagaFunc);
  yield takeLatest(LOGOUT_USER, logoutSagaFunc);
}
