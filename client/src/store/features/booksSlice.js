"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    addCreatedBook: (state, action) => {
      const preparedBooksToStore = { ...action.payload.data };

      state.projects.push(preparedBooksToStore);
    },
  },
});

export const { setBooks, addCreatedBook } = booksSlice.actions;
// export const { selectUser, selectRegisterStatus, selectError } =
//   authSlice.selectors;

export const selectBooks = (state) => state.books.books;
export default booksSlice.reducer;
