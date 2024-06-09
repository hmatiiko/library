import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.baseUrl }),
  endpoints: (builder) => ({
    sendLoginRequest: builder.mutation({
      query: (formData) => ({
        url: '/login',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    sendRegisterRequest: builder.mutation({
      query: (formData) => ({
        url: '/register',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useSendLoginRequestMutation, useSendRegisterRequestMutation } =
  authApi;

