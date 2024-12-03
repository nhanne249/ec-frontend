"use client";
import { FiUser } from "react-icons/fi";
import Link from "next/link";
import { hasCookie, getCookie } from "cookies-next";

const UserBtn = () => {
  if (hasCookie("role"))
    return (
      <Link
        href={`/${getCookie("role")}`}
        className="w-1/3 h-full flex items-center justify-center bg-transparent rounded-none relative font-semibold after:absolute after:h-0 after:w-0 after:bg-sky-800 after:left-1/2 overflow-hidden after:bottom-0 after:hover:h-1 after:hover:w-1 after:translate-x-full after:hover:scale-x-[300] after:hover:transition-all after:hover:duration-500 after:transition-all after:duration-500 transition-all duration-500"
      >
        <FiUser />
      </Link>
    );
  return (
    <Link
      href="/login"
      className="w-1/3 h-full flex items-center justify-center bg-transparent rounded-none relative font-semibold after:absolute after:h-0 after:w-0 after:bg-sky-800 after:left-1/2 overflow-hidden after:bottom-0 after:hover:h-1 after:hover:w-1 after:translate-x-full after:hover:scale-x-[300] after:hover:transition-all after:hover:duration-500 after:transition-all after:duration-500 transition-all duration-500"
    >
      <FiUser />
    </Link>
  );
};

export default UserBtn;
