"use client";
import React from "react";
import withAuth from "@/app/configs/route";

const Profile = () => {
  return <div>Profile</div>;
};

export default withAuth(Profile, ["customer"]);
