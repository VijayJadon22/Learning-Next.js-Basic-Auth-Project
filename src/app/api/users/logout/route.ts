import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json(
      { message: "Logged out succesfully" },
      { status: 200 }
    );

    response.cookies.delete("token");
    return response;
  } catch (error: any) {
    console.log("Error logginout user: ", error);
    return NextResponse.json(
      { error: error.message, success: true },
      { status: 500 }
    );
  }
};
