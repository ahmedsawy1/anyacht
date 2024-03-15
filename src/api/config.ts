import axios from 'axios';
import {AsyncKeys, getItem} from '../constants/helpers';

// export const domain = "localhost:8000";
// export const baseDomain = "http://" + domain;

export const domain = "api.anyacht.com";
export const baseDomain = "https://" + domain;

export const baseUrl = baseDomain + '/api/';

export const headers = {
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
  Accept: 'application/json',
};

export const axiosAPI = axios.create({
  baseURL: baseUrl,
  headers: headers,
});

axiosAPI.interceptors.request.use(
  async config => {
    let token = (await getItem(AsyncKeys.AUTH_TOKEN)) || '';
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    // const language = (await getItem(AsyncKeys.LANGUAGE)) || '';
    // if (language) {
    //   config.headers['Accept-Language'] = language;
    // }

    return config;
  },
  error => {
    console.log('error ', error);

    Promise.reject(error);
  },
);
