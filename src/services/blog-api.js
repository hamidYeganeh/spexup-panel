import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'src/config';
import { Endpoints } from './urls';
import { apiHelper } from 'src/utils/apiHelper';
import { baseQuery } from './baseQuery';

const TAGS = { list: 'blog-list' };
const convertTagTypes = (tag) => ({ type: tag, id: tag });


const BlogApi = createApi({
  reducerPath: 'blog-api',
  baseQuery,
  tagTypes: Object.values(TAGS).map((key) => ({ type: key, id: key })),
  endpoints: (builder) => ({
    // LIST
    blogList: builder.query({
      providesTags: [convertTagTypes(TAGS.list)],
      query: (body) => apiHelper(Endpoints.blog.list, body),
    }),
    // CREATE
    createBlog: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.blog.create,
        method: 'POST',
        body,
      }),
    }),
    // UPDATE
    updateBlog: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.blog.update,
        method: 'POST',
        body,
      }),
    }),
    // REMOVE
    // blogID
    removeBlog: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.blog.remove,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useBlogListQuery, useCreateBlogMutation, useUpdateBlogMutation, useRemoveBlogMutation } = BlogApi;
export { BlogApi };
