import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLoggedInUser } from "./restAPIs/authentication";

const getInitialDataByAccessToken = async () => {
  try {
    const res = await getLoggedInUser();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export async function middleware(request: NextRequest) {
  // Check if the token is present in cookies
  const access_token =localStorage.getItem("accessToken");
  const refresh_token =localStorage.getItem("refreshToken");

  if (access_token) {
    try {
      const user = await getInitialDataByAccessToken()

    } catch (error) {
      console.log(error)
    }
  }
  else {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

// Specify the routes that require middleware
export const config = {
  matcher: ["/", "/leads", "/user"], // Replace with your protected routes
};
