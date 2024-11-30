import { methods } from "@/app/configs/axiosConfigs/methods.client";

const url = "/auth"
export const login= (data) => {
    return methods.post(`${url}/login`, JSON.stringify(data));
}
export const register= (data) => {
    return methods.post(`${url}/register`, JSON.stringify(data));
}