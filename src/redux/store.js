import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";
import todoSlice from "./reducer/todoSlice";

export const store = configureStore({
  reducer: { todoSlice },
});
