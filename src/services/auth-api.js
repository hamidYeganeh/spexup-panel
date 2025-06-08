import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'src/config';
import { Endpoints } from './urls';

const TAGS = [];

const AuthApi = createApi({
  reducerPath: 'auth-api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    loginRequest: builder.mutation({
      query: (body) => ({
        url: Endpoints.auth.login,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginRequestMutation } = AuthApi;
export { AuthApi };
