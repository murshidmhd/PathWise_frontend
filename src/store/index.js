import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import reportreducer from "./slices/reportSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    report : reportreducer
  },
});

export default store;
