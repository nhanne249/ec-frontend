import { methods } from '@/app/configs/axiosConfigs/methods';

const url = '/products';
export const createProduct = data => {
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
};
export const getProductById = data => {
  return methods.get(`${url}/${data}`);
};
export const updateProductById = data => {
  return methods.patch(`${url}/${data.id}`, JSON.stringify(data));
};

export const getAllProducts = data => {
  let postfix = '';
  if (data?.name && data?.name != '') {
    postfix += '?name=' + data.name;
  }
  if (data?.category && data?.category != '') {
    postfix +=
      (postfix.length > 1 ? '&category=' : '?category=') + data.category;
  }
  if (data?.minPrice && data?.minPrice != '') {
    postfix +=
      (postfix.length > 1 ? '&minPrice=' : '?minPrice=') +
      Number(data.minPrice);
  }
  if (data?.maxPrice && data?.maxPrice != '') {
    postfix +=
      (postfix.length > 1 ? '&maxPrice=' : '?maxPrice=') +
      Number(data.maxPrice);
  }
  if (data?.brand && data?.brand != '') {
    postfix += (postfix.length > 1 ? '&brand=' : '?brand=') + data.brand;
  }
  if (data?.rating && data?.rating != '') {
    postfix +=
      (postfix.length > 1 ? '&rating=' : '?rating=') + Number(data.rating);
  }
  if (data?.desc && data?.desc != '') {
    postfix += (postfix.length > 1 ? '&desc=' : '?desc=') + data.desc;
  }
  if (data?.benefit && data?.benefit != '') {
    postfix += (postfix.length > 1 ? '&benefit=' : '?benefit=') + data.benefit;
  }
  return methods.get(`${url}${postfix}`);
};

export const deleteProductById = data => {
  return methods.delete(`${url}/${data}`);
};
