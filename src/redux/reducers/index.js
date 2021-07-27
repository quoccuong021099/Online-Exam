import { combineReducers } from "redux";
import keyLogin from "./loginReducer";
const rootReducer = combineReducers({
  keyLogin,
});

export default rootReducer;
