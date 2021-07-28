import { combineReducers } from "redux";
import keyLogin from "./loginReducer";
import keyChart from "./chartReducer";
const rootReducer = combineReducers({
  keyLogin,
  keyChart,
});

export default rootReducer;
