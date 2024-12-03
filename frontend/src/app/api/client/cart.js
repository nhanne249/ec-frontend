import { methods } from "@/app/configs/axiosConfigs/methods.client";

const url = "/carts"

export const createCartData = (data) => {
  return methods.post(`${url}`, JSON.stringify(data));
}

export const getCartServerData = () => {
  return methods.get(`${url}`);
}