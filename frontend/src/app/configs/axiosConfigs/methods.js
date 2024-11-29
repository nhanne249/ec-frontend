import httpHandler from './axios.config.js';
import { API_DOMAIN } from '../constant/api.constant.js';
async function get(domain, url, config = {}) {
  const axiosHttp = await httpHandler(domain);
  return axiosHttp.get(`${url}`, config);
}

async function post(domain, url, data, config = {}) {
  const axiosHttp = await httpHandler(domain);
  return axiosHttp.post(`${url}`, data, config);
}

async function put(domain, url, data, config = {}) {
  const axiosHttp = await httpHandler(domain);
  return axiosHttp.put(`${url}`, data, config);
}

async function patch(domain, url, data, config = {}) {
  const axiosHttp = await httpHandler(domain);
  return axiosHttp.patch(`${url}`, data, config);
}

async function del(domain, url, config = {}) {
  const axiosHttp = await httpHandler(domain);
  return axiosHttp.delete(`${url}`, config);
}

export const methods = {
  get: (url, config = {}) => {
    return get(`${API_DOMAIN.API}`, url, config);
  },
  post: (url, data, config = {}) => {
    return post(API_DOMAIN.API, url, data, config);
  },
  put: (url, data, config = {}) => {
    return put(API_DOMAIN.API, url, data, config);
  },
  patch: (url, data, config= {}) => {
    return patch(API_DOMAIN.API, url, data, config);
  },
  delete: (url, config = {}) => {
    return del(API_DOMAIN.API, url, config);
  },
};