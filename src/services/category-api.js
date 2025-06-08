import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'src/config';
import { Endpoints } from './urls';
import { apiHelper } from 'src/utils/apiHelper';
import { baseQuery } from './baseQuery';

const TAGS = { list: 'category-list' };
const convertTagTypes = (tag) => ({ type: tag, id: tag });

const CategoryApi = createApi({
  reducerPath: 'category-api',
  baseQuery,
  tagTypes: Object.values(TAGS).map((key) => ({ type: key, id: key })),
  endpoints: (builder) => ({
    // LIST
    // page, limit, title
    categoryList: builder.query({
      providesTags: [convertTagTypes(TAGS.list)],
      query: (body) => apiHelper(Endpoints.category.list, body),
    }),
    // CREATE
    // title
    createCategory: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.category.create,
        method: 'POST',
        body,
      }),
    }),
    // UPDATE
    // title | categoryID
    updateCategory: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.category.update,
        method: 'POST',
        body,
      }),
    }),
    // REMOVE
    // categoryID
    removeCategory: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.category.remove,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCategoryListQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useRemoveCategoryMutation } =
  CategoryApi;
export { CategoryApi };
