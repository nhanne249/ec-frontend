"use client";
import React from "react";
import withAuth from "@/app/configs/route";

const VoucherManagement = () => {
  return <div>VoucherManagement</div>;
};

export default withAuth(VoucherManagement, ["admin"]);
