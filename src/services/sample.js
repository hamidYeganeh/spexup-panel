import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'src/config';
import { Endpoints } from './urls';
import { apiHelper } from 'src/utils/apiHelper';

const TAGS = [];

const CategoryApi = createApi({
  reducerPath: 'category-api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // LIST
    // page, limit, title
    List: builder.query({
      query: (body) => apiHelper(Endpoints..list, body),
    }),
    // CREATE
    // title
    create: builder.mutation({
      query: (body) => ({
        url: Endpoints..create,
        method: 'POST',
        body,
      }),
    }),
    // UPDATE
    // 
    update: builder.mutation({
        query: (body) => ({
          url: Endpoints..update,
          method: 'POST',
          body,
        }),
      }),
    // REMOVE
    remove: builder.mutation({
        query: (body) => ({
          url: Endpoints..remove,
          method: 'POST',
          body,
        }),
      }),  
  }),
});

export const { useCategoryListQuery, useCreateCategoryMutation } = CategoryApi;
export { CategoryApi };
