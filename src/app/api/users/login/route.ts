import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectToDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          message: "Invalid Password",
        },
        { status: 400 }
      );
    }

    //create token using jsonwebtoken
    const token = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json(
      {
        message: "User logged in successfully",
        user: { username: user.name, email: user.email },
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });
      
      return response;
  } catch (error: any) {
    console.error("Error in POST /api/login:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
