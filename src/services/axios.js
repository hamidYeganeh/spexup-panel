import axios from 'axios';
import { BASE_URL } from 'src/config';
import { getSession } from 'src/utils/jwt';
import i18n from 'i18next';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    lt: getSession() || null,
    ln: i18n.language || 'en',
  },
  timeout: 60 * 1000,
});
