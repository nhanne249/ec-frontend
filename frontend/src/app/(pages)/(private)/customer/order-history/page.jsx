"use client";
import React from "react";
import withAuth from "@/app/configs/route";

const OrderHistory = () => {
  return <div>OrderHistory</div>;
};

export default withAuth(OrderHistory, ["customer"]);
