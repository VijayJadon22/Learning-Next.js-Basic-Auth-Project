"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (formData.email.length > 0 && formData.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", formData);
      console.log("login sucess, response: ", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Error logingin user: ", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-40 py-4 border">
      <form
        onSubmit={handleLogin}
        className="border w-full flex flex-col items-center space-y-4 p-4"
      >
        <h1>Login</h1>

        <input
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
          className="py-1 px-4 border bg-white text-gray-500 outline-none rounded-lg"
          id="email"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
        />
        <input
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
          className="py-1 px-4 border bg-white text-gray-500 outline-none rounded-lg"
          id="password"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
        />
        <button
          disabled={buttonDisabled}
          className={`${
            buttonDisabled ? `opacity-50 cursor-not-allowed` : "cursor-pointer"
          } px-8 py-1 bg-white text-gray-700 rounded-lg `}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <Link href={"/signup"}>Visit signup Page</Link>
      </form>
    </div>
  );
}
