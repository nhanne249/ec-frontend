import { methods } from "@/app/configs/axiosConfigs/methods.client";

const url = "/orders"
export const createOrder = (data) => {  
    // const dataSended = {
    //     userId: data.userId, // userId is String
    //     items: [],
    //     status: "Pending",
    //     paymentMethod: data.paymentMethod,
    //     totalAmount: data.totalAmount,// totalAmount is number
    //     shippingAddress: {
    //         street: "",
    //         city: "",
    //         state: "",
    //         zipCode: "",
    //         country: ""
    //     },
    //         orderDate: "2024-11-18T02:52:18.532Z",
    //         deliveryDate: "2024-11-18T02:52:18.532Z"
    // }
    return methods.post(`${url}`, JSON.stringify(data));
}
export const getAllOrders = () => {
    return methods.get(`${url}`);
}
export const getOrderById = (data) => {
    return methods.get(`${url}/${data}`);
}

export const updateOrderStatus = (data) => {
    return methods.patch(`${url}/${data.id}/status`, JSON.stringify(data.status)); 
}
