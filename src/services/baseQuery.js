import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'src/config';
import { getSession } from 'src/utils/jwt';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  headers: {
    lt: getSession(),
  },
  timeout: 60 * 1000,
});
