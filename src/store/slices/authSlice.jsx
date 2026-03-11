import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: localStorage.getItem("access"),
  role: localStorage.getItem("role"),
  isAuthenticated: !!localStorage.getItem("access"),
};
initialState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      localStorage.setItem("access", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;

      localStorage.removeItem("access");
      localStorage.removeItem("role");
    },
  },
});
export const { setUser, logout } = authSlice.actions; 

export default authSlice.reducer;
