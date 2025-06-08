import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'src/config';
import { Endpoints } from './urls';
import { apiHelper } from 'src/utils/apiHelper';
import { baseQuery } from './baseQuery';

const TAGS = [];

const UserApi = createApi({
  reducerPath: 'user-api',
  baseQuery,
  endpoints: (builder) => ({
    // LIST
    // page, limit, title
    UserList: builder.query({
      query: (body) => apiHelper(Endpoints.user.list, body),
    }),
  }),
});

export const { useUserListQuery } = UserApi;
export { UserApi };
