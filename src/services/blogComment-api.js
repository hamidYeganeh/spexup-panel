import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'src/config';
import { baseQuery } from './baseQuery';
import { Endpoints } from './urls';
import { apiHelper } from 'src/utils/apiHelper';

const TAGS = [];

const BlogCommentApi = createApi({
  reducerPath: 'blogComment-api',
  baseQuery,
  endpoints: (builder) => ({
    // LIST
    // page, limit, title
    BlogCommentList: builder.query({
      query: (body) => apiHelper(Endpoints.blogComment.list, body),
    }),
    // CREATE
    // title
    createBlogComment: builder.mutation({
      query: (body) => ({
        url: Endpoints.blogComment.create,
        method: 'POST',
        body,
      }),
    }),
    // UPDATE
    //
    updateBlogComment: builder.mutation({
      query: (body) => ({
        url: Endpoints.blogComment.update,
        method: 'POST',
        body,
      }),
    }),
    // REMOVE
    removeBlogComment: builder.mutation({
      query: (body) => ({
        url: Endpoints.blogComment.remove,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useBlogCommentListQuery,
  useCreateBlogCommentMutation,
  useUpdateBlogCommentMutation,
  useRemoveBlogCommentMutation,
} = BlogCommentApi;
export { BlogCommentApi };
