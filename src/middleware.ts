import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLoggedInUser, refreshSession } from "./restAPIs/authentication";
import Cookies from "js-cookie";

const getInitialDataByAccessToken = async (token: string) => {
  try {
    const res = await getLoggedInUser(token);
    return res;
  } catch (error) {
    console.error("Failed to fetch initial data with access token:", error);
    throw error;
  }
};

const getAccessTokenUsingRefresh = async (token: string) => {
  Cookies.remove("accessToken")
  try {
    const res = await refreshSession(token);
    return res.data.accessToken;
  } catch (error) {
    console.error("Failed to refresh session:", error);
    throw error;
  }
};

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (accessToken) {
    try {
      const res = await getInitialDataByAccessToken(accessToken);
      if (res?.data) {
        console.log("User data fetched with access token:", res?.data);
      }
    } catch (error) {
      console.error("Access token is invalid, trying refresh token...", error);
      if (refreshToken) {
        try {
          const newAccessToken = await getAccessTokenUsingRefresh(refreshToken);
          const res = await getInitialDataByAccessToken(newAccessToken);
          if (res?.data) {
            console.log(
              "User data fetched with refreshed access token:",
              res?.data
            );
          }
        } catch (error) {
          console.error(
            "Failed to refresh access token, redirecting to login...", error
          );
          return NextResponse.redirect(new URL("/login", request.url));
        }
      } else {
        console.error("No refresh token available, redirecting to login...");
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  } else if (refreshToken) {
    try {
      const newAccessToken = await getAccessTokenUsingRefresh(refreshToken);
      const res = await getInitialDataByAccessToken(newAccessToken);
      if (res?.data) {
        console.log(
          "User data fetched with refreshed access token:",
          res?.data
        );
      }
    } catch (error) {
      console.error("Failed to refresh access token, redirecting to login...", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/leads", "/user"],
};
