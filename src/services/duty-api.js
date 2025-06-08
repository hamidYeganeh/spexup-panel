import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'src/config';
import { baseQuery } from './baseQuery';
import { Endpoints } from './urls';
import { apiHelper } from 'src/utils/apiHelper';

const TAGS = { list: 'blog-list' };
const convertTagTypes = (tag) => ({ type: tag, id: tag });

const DutyApi = createApi({
  reducerPath: 'duty-api',
  baseQuery,
  tagTypes: Object.values(TAGS).map((key) => ({ type: key, id: key })),
  endpoints: (builder) => ({
    // LIST
    // page, limit, title
    DutyList: builder.query({
      providesTags: [convertTagTypes(TAGS.list)],
      query: (body) => apiHelper(Endpoints.duty.list, body),
    }),
    // CREATE
    // title
    createDuty: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.duty.create,
        method: 'POST',
        body,
      }),
    }),
    // UPDATE
    //
    updateDuty: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.duty.update,
        method: 'POST',
        body,
      }),
    }),
    // REMOVE
    removeDuty: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.duty.remove,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useDutyListQuery, useCreateDutyMutation, useUpdateDutyMutation, useRemoveDutyMutation } = DutyApi;
export { DutyApi };
