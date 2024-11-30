import React from "react";
import Image from "next/image";
import notfound from "./assets/img/not-found.webp";
const NotFound = () => {
  console.log("Not Found");
  return <Image src={notfound} className="w-screen h-screen" />;
};

export default NotFound;
