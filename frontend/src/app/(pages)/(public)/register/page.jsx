"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { hasCookie } from "cookies-next";
import { Input } from "@nextui-org/react";
import "./styles.scss";

const Register = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(formData);
  };

  if (hasCookie("token")) router.push("/customer/profile");

  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-auth">
      <div className="w-fit h-fit flex justify-center items-center flex-col bg-white bg-opacity-70 p-5 rounded-lg">
        <h1 className="text-5xl font-bold h-20 pb-3 pt-5 text-sky-800">Register</h1>
        <h1 className="text-xs h-auto pb-5 text-sky-800">Hi!</h1>
        <form onSubmit={handleSubmit} className="w-[400px] h-auto flex flex-col gap-3">
          <Input isRequired type="text" name="username" label="Username" className="" isClearable onChange={handleChange} />
          <Input isRequired type="password" name="password" label="Password" className="" isClearable onChange={handleChange} />
          <button
            className="w-52 h-12 z-10 mb-5 rounded-md bg-sky-800 !text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-sky-700 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#075985;] hover:[text-shadow:2px_2px_2px_#7dd4fc] text-2xl"
            type="submit"
          >
            Register
          </button>
        </form>
        <div className="w-full flex flex-row justify-around items-center">
          <h1 className="text-sm h-fit text-sky-800 text-center">Have account?</h1>
          <button className="w-auto !text-sky-800 text-lg" onClick={() => router.push("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
