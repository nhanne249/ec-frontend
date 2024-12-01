"use client";
import React from "react";
import withAuth from "@/app/configs/route";

const OrderManagement = () => {
  return <div>OrderManagement</div>;
};

export default withAuth(OrderManagement, ["admin"]);
