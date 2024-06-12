import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooksRequest: builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
      providesTags: ["Books"],
    }),
    sendCreateBookRequest: builder.mutation({
      query: (formData) => ({
        url: "/books",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBookRequest: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
      invalidatesTags: ["Books"],
    }),
    editBookRequest: builder.mutation({
      query: (formData) => ({
        url: `/books/${formData.id}`,
        method: "PATCH",
        body: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useSendCreateBookRequestMutation,
  useGetBooksRequestQuery,
  useEditBookRequestMutation,
  useDeleteBookRequestMutation,
} = booksApi;
