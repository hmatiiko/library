"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import booksReducer from "./features/booksSlice";
import { authApi } from "../services/authApi";
import { booksApi } from "../services/booksApi";

const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
  [authApi.reducerPath]: authApi.reducer,
  [booksApi.reducerPath]: booksApi.reducer,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, booksApi.middleware]),
});
