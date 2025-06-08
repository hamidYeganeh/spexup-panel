import { apiHelper } from 'src/utils/apiHelper';
import { api } from './axios';
import { Endpoints } from './urls';
import { BASE_URL } from 'src/config';

export const uploadMedia = async (body) => {
  const response = await api.post(Endpoints.media.upload, body, { headers: { 'Content-Type': 'multipart/form-data' } });
  return response.data;
};
export const getMedia = (hash) => {
  return apiHelper(BASE_URL + Endpoints.media.get, { hash, pt: 'm1000' });
};
