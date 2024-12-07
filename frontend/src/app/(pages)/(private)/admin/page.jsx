"use client";
import React from "react";
import withAuth from "@/app/configs/route";
const Dashboard = () => {
  return <h1 className="text-3xl font-bold text-center mb-10">Admin Dashboard</h1>;
};

export default withAuth(Dashboard, ["admin"]);
