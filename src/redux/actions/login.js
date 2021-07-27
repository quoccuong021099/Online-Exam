import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
} from "../constants/login";

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
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
