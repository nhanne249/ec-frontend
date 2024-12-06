import { methods } from "@/app/configs/axiosConfigs/methods.client";

const url = "/vouchers"
export const createVoucher= (data) => {
    return methods.post(`${url}/create`, JSON.stringify(data));
}
export const getVoucher= () => {
    return methods.get(`${url}`);
}
export const getVoucherByCode= (data) => {
    return methods.get(`${url}/${data}`);
}