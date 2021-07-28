import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILED,
} from "../constants/login";

// Đăng nhập
export const loginUser = (userInfo) => {
  return {
    type: LOGIN_USER,
    userInfo,
  };
};
export const loginUserSuccess = (payload) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload,
  };
};
export const loginUserFaiure = (message) => {
  return {
    type: LOGIN_USER_FAILED,
    message,
  };
};
// Đăng xuất
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
// Đăng ký
export const signupUser = (userInfo) => {
  return {
    type: SIGNUP_USER,
    userInfo,
  };
};
export const signupUserSuccess = (payload) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload,
  };
};
export const signupUserFaiure = (message) => {
  return {
    type: SIGNUP_USER_FAILED,
    message,
  };
};
