"use client";
import { useContext } from "react";
import { Button } from "@nextui-org/react";
import { MyContext } from "@/app/utils/Context";

const AddToCartBtn = ({ id }) => {
  const { cartNoti, setCartNoti } = useContext(MyContext);

  return (
    <Button
      className="bg-sky-800 text-white text-xl font-bold w-40"
      onClick={() => {
        let cart = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("cart")) || [];
        const productIndex = cart.findIndex((item) => item.productId === id);
        if (productIndex !== -1) {
          cart[productIndex].quantity += 1;
        } else {
          cart.push({ productId: id, quantity: 1 });
        }
        typeof window !== 'undefined' && localStorage.setItem("cart", JSON.stringify(cart));
        setCartNoti(cartNoti + 1);
      }}
    >
      Add to cart
    </Button>
  );
};
export default AddToCartBtn;
