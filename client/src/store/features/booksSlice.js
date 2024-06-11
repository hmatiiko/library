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
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => {
        return book.id !== action.payload;
      });
    },
  },
});

export const { setBooks, addCreatedBook, deleteBook } = booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export default booksSlice.reducer;
