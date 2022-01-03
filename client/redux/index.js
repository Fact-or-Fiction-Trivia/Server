import { combineReducers } from "redux";

// import auth from "./reducers/auth";
import rssFeed from "./reducers/rssFeed";
import auth from "./reducers/auth";
import admin from "./reducers/admin";
import keyword from "./reducers/keyword";
import user from "./reducers/user";
import agent from "./reducers/agent";

const rootReducer = combineReducers({
  auth,
  user,
  agent,
  rssFeed,
  admin,
  keyword,
});

export default rootReducer;
