"use client";
import { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Badge } from "@nextui-org/react";
import Link from "next/link";
import { MyContext } from "../../Context";

import React from "react";

const CartBtn = () => {
  const { cartNoti } = useContext(MyContext);

  return (
    <Link
      href="/cart"
      className="w-1/3 h-full flex items-center justify-center bg-transparent rounded-none relative font-semibold after:absolute after:h-0 after:w-0 after:bg-sky-800 after:left-1/2 overflow-hidden after:bottom-0 after:hover:h-1 after:hover:w-1 after:translate-x-full after:hover:scale-x-[300] after:hover:transition-all after:hover:duration-500 after:transition-all after:duration-500 transition-all duration-500"
    >
      <Badge content={cartNoti} color="danger">
        <FiShoppingCart />
      </Badge>
    </Link>
  );
};

export default CartBtn;
