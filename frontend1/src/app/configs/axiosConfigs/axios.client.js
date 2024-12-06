"use client"
import axios from "axios";
import { getCookie } from "cookies-next";

export default function httpHandler(baseURL) {
  const myCookieValue = getCookie("token"); 

  const axiosHttp = axios.create({ baseURL });

  axiosHttp.interceptors.request.use((config) => {
    if (myCookieValue) {
      config.headers['Authorization'] = `Bearer ${myCookieValue}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  }, function interceptError(error) {
    return Promise.reject(error);
  });
  axiosHttp.interceptors.response.use(function intercept(response) {
    return response.data;
  }, function interceptError(error) {
    return Promise.reject(error);
  });
  return axiosHttp;
}