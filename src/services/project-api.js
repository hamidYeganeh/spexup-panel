import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'src/config';
import { baseQuery } from './baseQuery';
import { Endpoints } from './urls';
import { apiHelper } from 'src/utils/apiHelper';

const TAGS = { list: 'project-list' };
const convertTagTypes = (tag) => ({ type: tag, id: tag });

const ProjectApi = createApi({
  reducerPath: 'project-api',
  baseQuery,
  tagTypes: Object.values(TAGS).map((key) => ({ type: key, id: key })),
  endpoints: (builder) => ({
    // LIST
    // page, limit, title
    ProjectList: builder.query({
      providesTags: [convertTagTypes(TAGS.list)],
      query: (body) => apiHelper(Endpoints.project.list, body),
    }),
    // CREATE
    // title
    createProject: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.project.create,
        method: 'POST',
        body,
      }),
    }),
    // UPDATE
    //
    updateProject: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.project.update,
        method: 'POST',
        body,
      }),
    }),
    // REMOVE
    removeProject: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.project.remove,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useProjectListQuery, useCreateProjectMutation, useUpdateProjectMutation, useRemoveProjectMutation } =
  ProjectApi;
export { ProjectApi };
