import { methods } from "@/app/configs/axiosConfigs/methods";

const url = "/auth"
const auth = {
    login: (data) => {
        return methods.post(`${url}/login`, JSON.stringify(data));
    },
    register: (data) => {
        return methods.post(`${url}/register`, JSON.stringify(data));
    }
}
export default auth;