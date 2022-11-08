import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import goalReducer from "./features/goal/goalSlice";

export const store = configureStore({
  reducer: {
    goal: goalReducer,
    auth: authSlice,
  },
});
