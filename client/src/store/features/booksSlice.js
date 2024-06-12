"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  loading: false,
  error: null,
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
    updateBook: (state, action) => {
      state.books = state.books.map((book) => {
        if (book.id === action.payload.id) {
          return action.payload;
        }
        return book;
      });
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((book) => {
        return book.id !== action.payload;
      });
    },
  },
});

export const { setBooks, addCreatedBook, deleteBook, updateBook } =
  booksSlice.actions;

export const selectBooks = (state) => state.books.books;
export const selectBookById = (bookId) => (state) =>
  state.books.books.find((book) => book.id === +bookId);
export default booksSlice.reducer;
