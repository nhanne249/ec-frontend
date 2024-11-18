import { methods } from "@/app/configs/axiosConfigs/methods";

const url = "/products"
export const createProduct = (data) => {
    // const dataSended = {
    //     name: data.name,
    //     price: data.price, //price is float
    //     desc: data.desc,
    //     category: data.category,
    //     stock: data.stock, // stock is number
    //     brand: data.brand,
    //     benefit: data.benefit,
    //     capacity: data.capacity,
    //     rating: data.rating, // rating is number
    //     isDel: data.isDel, // isDel is boolean
    //     images: data.images // data.image is array []
    // }
    return methods.post(`${url}`, JSON.stringify(data));
}
export const getProductById = (data) => {
    return methods.get(`${url}/${data}`);
}
export const updateProductById = (data) => {
    return methods.patch(`${url}/${data.id}`, JSON.stringify(data));
}

export const getAllProducts = () => {
    return methods.get(`${url}`); 
}

export const deleteProductById = (data) => {
    return methods.delete(`${url}/${data}`);
}