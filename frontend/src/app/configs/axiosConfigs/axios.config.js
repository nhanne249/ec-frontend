'use client'
import axios from 'axios';
import {getCookie } from 'cookies-next';

const myCookieValue=getCookie('token')
const httpHandler = (baseURL) => {
    const axiosHttp = axios.create({ baseURL });
    axiosHttp.interceptors.request.use(async function intercept(config) {
        const interceptedConfig = config;
        if (myCookieValue != null) {
            interceptedConfig.headers['Authorization'] = 'Bearer ' + myCookieValue;
        }
        interceptedConfig.headers['Content-Type'] = 'application/json';
        return interceptedConfig;
    },
        function interceptError(error) {
            return Promise.reject(error);
        }
    );
    axiosHttp.interceptors.response.use(function intercept(response) {
        return response.data
    },
        function interceptError(error) {
            return Promise.reject(error);
        }
    );
    return axiosHttp;
}

export default httpHandler;