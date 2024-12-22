import { NextResponse, type NextRequest } from "next/server";
import { getLoggedInUser, refreshSession } from "./restAPIs/authentication";
import Cookies from "js-cookie";
import checkPermission from "./roleAuthorization";

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
  const response = NextResponse.next();

  if (accessToken) {
    try {
      const res = await getInitialDataByAccessToken(accessToken);
      if (res?.data) {
        response.cookies.set("user", JSON.stringify(res?.data))
        if (!checkPermission(request.nextUrl.pathname, res?.data?.role)) {
          return NextResponse.redirect(new URL("/", request.url))
        }
      }
    } catch (error) {
      console.error("Access token is invalid, trying refresh token...", error);
      if (refreshToken) {
        try {
          const newAccessToken = await getAccessTokenUsingRefresh(refreshToken);
          response.cookies.set("accessToken", newAccessToken)
          const res = await getInitialDataByAccessToken(newAccessToken);
          if (res?.data) {
            response.cookies.set("user", JSON.stringify(res?.data))
            if (!checkPermission(request.nextUrl.pathname, res?.data?.role)) {
              return NextResponse.redirect(new URL("/", request.url))
            }
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
      response.cookies.set("accessToken", newAccessToken)
      const res = await getInitialDataByAccessToken(newAccessToken);
      if (res?.data) {
        response.cookies.set("user", JSON.stringify(res?.data))
        if (!checkPermission(request.nextUrl.pathname, res?.data?.role)) {
          return NextResponse.redirect(new URL("/", request.url))
        }
      }
    } catch (error) {
      console.error("Failed to refresh access token, redirecting to login...", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/leads", "/user/:path", "/about"],
};
