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
      const { token, user, role } = action.payload;
      state.token = token;
      state.user = user;
      state.role = role;
      state.isAuthenticated = true;
      
      // Default to approved unless it's a counselor who isn't approved
      state.approvalStatus = (role === 'counselor' && user?.is_approved === false) ? "pending" : "approved";

      localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));
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
