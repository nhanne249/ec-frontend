import axios from "axios";
import { cookies } from "next/headers"; // Dùng API cookies của Next.js

export default async function httpHandler(baseURL) {
  const cookieStore = await cookies();
  const myCookieValue = cookieStore.get("token")?.value; 

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