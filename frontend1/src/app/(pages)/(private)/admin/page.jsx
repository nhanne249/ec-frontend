"use client";
import React from "react";
import withAuth from "@/app/configs/route";
const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default withAuth(Dashboard, ["admin"]);
