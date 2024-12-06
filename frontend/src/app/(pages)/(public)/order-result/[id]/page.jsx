"use client";

import { use, useEffect } from "react";
import successImg from "../../../../assets/img/success.png";
import cancelImg from "../../../../assets/img/cancel.png";
import Image from "next/image";

const OrderResult = ({ params, searchParams }) => {
  const { id } = use(params);
  const { cancel } = use(searchParams);

  localStorage.removeItem("cart");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <Image alt={cancel == "true" ? "Cancel" : "Success"} src={cancel == "true" ? cancelImg : successImg} width={150} height={150} />
      <div className="flex flex-row">
        <div className="text-3xl font-medium text-gray-600">Order code : </div>
        <div className="text-3xl font-medium text-sky-800">{id}</div>
      </div>
      <div className="text-base w-fit font-medium text-gray-600">
        {cancel == "true" ? "Your order has been placed successfully and will be delivered to you as soon as possible." : " The order has been cancelled"}
      </div>
    </div>
  );
};

export default OrderResult;
