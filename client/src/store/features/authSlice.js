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
      state.user = null;
      state.errorMessage = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectRegisterStatus = (state) => state.auth.isAuthenticated;
export const selectError = (state) => state.auth.errorMessage;
export default authSlice.reducer;
