import { methods } from "@/app/configs/axiosConfigs/methods.client";

const url = "/reviews"
export const createReview = (data) => {
    // const dataSended = {
    //     userId: data.userId,
    //     productId: data.id,
    //     rating: data.rating, // rating is number
    //     comment: data.comment
    // }
    return methods.post(`${url}`, JSON.stringify(data));
}
export const getReviewsOfProduct = (data) => {
    return methods.get(`${url}/${data}`);
}
export const updateReview = (data) => {
    return methods.patch(`${url}/${data.id}`, JSON.stringify(data));
}

export const deleteReview = (data) => {
    // const data=id
    return methods.delete(`${url}/${data}`); 
}
