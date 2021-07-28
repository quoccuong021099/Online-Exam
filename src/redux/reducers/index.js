import { combineReducers } from "redux";
import keyLogin from "./loginReducer";
import keyChart from "./chartReducer";
import keyQuestion from "./questionReducer";
const rootReducer = combineReducers({
  keyLogin,
  keyQuestion,
  keyChart,
});

export default rootReducer;
