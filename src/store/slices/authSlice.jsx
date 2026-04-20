import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: localStorage.getItem("access"),
  role: localStorage.getItem("role"),
  isAuthenticated: !!localStorage.getItem("access"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  approvalStatus: localStorage.getItem("approvalStatus") || "approved",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.approvalStatus =
        action.payload.user?.approval_status || "approved";

      localStorage.setItem("access", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      console.log(action.payload.user);
      localStorage.setItem("approvalStatus", state.approvalStatus);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.user = null;
      state.approvalStatus = "approved";

      localStorage.removeItem("access");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("approvalStatus");
    },
    updateWallet: (state, action) => {
      if (state.user) {
        state.user.wallet = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});
export const { setUser, logout, updateWallet } = authSlice.actions;

export default authSlice.reducer;
