import { combineReducers } from "redux";
import main from "./main";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import assessmentReducer from "./assessmentReducer";
import uiReducer from "./uiReducer";

const rootReducer = combineReducers({
  main: main,
  auth: authReducer,
  user: userReducer,
  ui: uiReducer,
  assessment: assessmentReducer,
});

export default rootReducer;
