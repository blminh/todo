import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./todoReducer";

const rootReducer = combineReducers({
  worker: todoReducer,
});

export default rootReducer;
