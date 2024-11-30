"use client";
import React from "react";
import withAuth from "@/app/configs/route";

const ProductsManagement = () => {
  return <div>ProductsManagement</div>;
};

export default withAuth(ProductsManagement, ["admin"]);
