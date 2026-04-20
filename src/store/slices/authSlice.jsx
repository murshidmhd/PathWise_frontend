import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  approvalStatus: localStorage.getItem("approvalStatus") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { access, user, role } = action.payload;
      state.token = access;
      state.user = user;
      state.role = role;
      state.isAuthenticated = true;
      state.approvalStatus = user.is_approved ? "approved" : "pending";

      localStorage.setItem("token", access);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);
      localStorage.setItem("approvalStatus", state.approvalStatus);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.approvalStatus = null;

      localStorage.removeItem("token");
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
