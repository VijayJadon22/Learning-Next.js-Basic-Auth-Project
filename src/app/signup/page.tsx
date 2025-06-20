"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handlesignup = async () => {};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-40 py-4 border">
      <form
        onSubmit={handlesignup}
        className="border w-full flex flex-col items-center space-y-4 p-4"
      >
        <h1>Signup</h1>
        <input
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              username: e.target.value,
            }))
          }
          className="py-1 px-4 border bg-white text-gray-500 outline-none rounded-lg"
          id="username"
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username"
        />
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
        <button className="px-8 py-1 bg-white text-gray-700 rounded-lg cursor-pointer">
          Signup
        </button>
        <Link href={"/login"}>Visit login Page</Link>
      </form>
    </div>
  );
}
