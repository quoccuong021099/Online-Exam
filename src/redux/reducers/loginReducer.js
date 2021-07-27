import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
} from "../constants/login";
import produce from "immer";
export const initialState = {
  users: [],
  statusFlags: {
    isLoading: false,
    isLoginFailure: false,
    isLoginSuccess: false,
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
        draft.statusFlags.isLoginSuccess = false;
        draft.statusFlags.isLoginFailure = true;
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
