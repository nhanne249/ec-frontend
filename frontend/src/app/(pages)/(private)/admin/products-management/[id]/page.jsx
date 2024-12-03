"use client"; // Đánh dấu đây là một Client Component
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProductById } from "@/app/api/client/products"; // Đảm bảo đường dẫn này đúng
import { Input, Button, Card, CardFooter } from "@nextui-org/react";
import withAuth from "@/app/configs/route";
import { toast } from "react-toastify";

const ProductPage = ({ params }) => {
  const id = { params };
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        await getProductById(id).then((res) => {
          setProduct(res.product);
        });
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row items-center space-x-2 w-1/2 justify-between">
        <div className="font-semibold w-1/3">Product name:</div>
        <Input value={product.name} />
      </div>
      <div className="flex flex-row items-center space-x-2 w-1/2 justify-between">
        <div className="font-semibold w-1/3">Price:</div>
        <Input type="number" value={product.price} />
      </div>
      <div className="flex flex-row items-center space-x-2 w-1/2 justify-between">
        <div className="font-semibold w-1/3">Original price:</div>
        <Input type="number" value={product.originalPrice} />
      </div>
      <div className="flex flex-row items-center space-x-2 w-1/2 justify-between">
        <div className="font-semibold w-1/3">Description:</div>
        <Input value={product.desc} />
      </div>
      <div className="flex flex-row items-center space-x-2 w-1/2 justify-between">
        <div className="font-semibold w-1/3">Category:</div>
        <Input value={product.category} />
      </div>
      <div className="flex flex-row items-center space-x-2 w-1/2 justify-between">
        <div className="font-semibold w-1/3">Stock:</div>
        <Input type="number" value={product.stock} />
      </div>
      <div className="flex flex-row items-center space-x-2 w-1/2 justify-between">
        <div className="font-semibold w-1/3">Benefit:</div>
        <Input value={product.benefit} />
      </div>
      <div className="flex flex-row items-center space-x-2 w-1/2 justify-between">
        <div className="font-semibold w-1/3">Rating:</div>
        <Input type="number" max="5" min="1" value={product.rating} />
      </div>
    </div>
  );
};

export default withAuth(ProductPage, ["admin"]); // Bảo vệ trang nếu cần
