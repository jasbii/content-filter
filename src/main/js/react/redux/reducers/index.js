import { combineReducers } from "redux";
import authorizedSite from "./authorizedSite";
import uiReducer from "./uiReducer";

export default combineReducers({
  sites: authorizedSite,
  ui: uiReducer,
});
