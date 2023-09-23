import { configureStore } from "@reduxjs/toolkit";
import APIReducer from "../redux/APISlice";

export const store = configureStore({
  reducer: {
    API: APIReducer,
  },
});
