import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'src/config';
import { baseQuery } from './baseQuery';
import { Endpoints } from './urls';
import { apiHelper } from 'src/utils/apiHelper';

const TAGS = { list: 'contact-list' };
const convertTagTypes = (tag) => ({ type: tag, id: tag });

const ContactApi = createApi({
  reducerPath: 'contact-api',
  baseQuery,
  tagTypes: [convertTagTypes(TAGS.list)],
  endpoints: (builder) => ({
    // LIST
    // page, limit, title
    ContactList: builder.query({
      providesTags: [convertTagTypes(TAGS.list)],
      query: (body) => apiHelper(Endpoints.contact.list, body),
    }),
    // CREATE
    // title
    createContact: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.contact.create,
        method: 'POST',
        body,
      }),
    }),
    // UPDATE
    //
    updateContact: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.contact.update,
        method: 'POST',
        body,
      }),
    }),
    // REMOVE
    removeContact: builder.mutation({
      invalidatesTags: [convertTagTypes(TAGS.list)],
      query: (body) => ({
        url: Endpoints.contact.remove,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useContactListQuery, useCreateContactMutation, useUpdateContactMutation, useRemoveContactMutation } =
  ContactApi;
export { ContactApi };
