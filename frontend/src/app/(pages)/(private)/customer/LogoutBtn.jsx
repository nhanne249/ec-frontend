"use client";
import { deleteCookie } from "cookies-next";

const LogoutBtn = () => {
  const handleClickLogoutBtn = () => {
    deleteCookie("role");
    deleteCookie("token");
  };
  return (
    <button
      className="text-start w-full h-12 pl-5 block !text-black font-semibold text-xl bg-transparent z-10 relative after:-z-20 after:absolute after:h-full after:w-1 after:bg-sky-transparent after:hover:bg-sky-600 after:text-white after:left-0 overflow-hidden after:bottom-5 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 hover:!text-white content-center"
      onClick={() => handleClickLogoutBtn()}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
