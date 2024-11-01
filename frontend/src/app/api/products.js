import { methods } from "@/app/configs/axiosConfigs/methods";

const url = "/products"
const products = {
    createProduct: (data) => {
        return methods.post(`${url}`, JSON.stringify(data));
    },
    getAllProducts: () => {
        return methods.get(`${url}`);
    },
    getProductById: (data) => {
        return methods.get(`${url}/${data}`);
    },
    updateProductById: (data) => {
        return methods.patch(`${url}/${data.id}`, JSON.stringify(data));
    },
    deleteProductById: (data) => {
        return methods.delete(`${url}/${data}`);
    }
}
export default products;
export const getAllProducts = () => {
    return methods.get(`${url}`); 
}