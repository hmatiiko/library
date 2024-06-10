"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = action.payload.isGetToken;
      state.user = action.payload.token;
      state.errorMessage = action.payload.errorMessage;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
  //   selectors: {
  //     selectUser: (state) => state.user,
  //     selectRegisterStatus: (state) => state.isAuthenticated,
  //     selectError: (state) => state.errorMessage,
  //   },
});

export const { login, logout } = authSlice.actions;
// export const { selectUser, selectRegisterStatus, selectError } =
//   authSlice.selectors;

export const selectUser = (state) => state.auth.user;
export const selectRegisterStatus = (state) => state.auth.isAuthenticated;
export const selectError = (state) => state.auth.errorMessage;
export default authSlice.reducer;
