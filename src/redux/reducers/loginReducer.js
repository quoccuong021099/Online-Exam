import produce from "immer";
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
  SIGNUP_USER,
  SIGNUP_USER_FAILED,
  SIGNUP_USER_SUCCESS,
} from "../constants/login";
const user = JSON.parse(localStorage.getItem("user-info"));
export const initialState = {
  users: user ? user : [],
  statusFlags: {
    isLoading: false,
    isLoginFailure: false,
    isLoginSuccess: user ? true : false,
    isSignupFailure: false,
    isSignupSuccess: false,
  },
  logs: {
    err: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_USER: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case LOGIN_USER_SUCCESS: {
        draft.users = action.payload;
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isLoginSuccess = true;
        draft.statusFlags.isLoginFailure = false;
        break;
      }
      case LOGIN_USER_FAILED: {
        draft.logs.err = action.message;
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isLoginSuccess = false;
        draft.statusFlags.isLoginFailure = true;
        break;
      }
      case SIGNUP_USER: {
        draft.statusFlags.isLoading = true;
        break;
      }
      case SIGNUP_USER_SUCCESS: {
        draft.users = action.payload;
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isLoginSuccess = true;
        draft.statusFlags.isSignupSuccess = true;
        draft.statusFlags.isSignupFailure = false;
        break;
      }
      case SIGNUP_USER_FAILED: {
        draft.logs.err = action.message;
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isSignupSuccess = false;
        draft.statusFlags.isSignupFailure = true;
        break;
      }
      // LOGOUT
      case LOGOUT_USER: {
        draft.statusFlags.isLoginSuccess = false;
        break;
      }
    }
  });

export default loginReducer;
