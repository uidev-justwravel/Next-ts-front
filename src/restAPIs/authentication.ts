import { axiosClient } from "@/config";

export const initialAuthentication = () => {
  return axiosClient.get(`/user/me`);
};

export const loginuser = (email: string, passowrd: string) => {
  return axiosClient.post(`/auth/login`, {
    username: email,
    password: passowrd,
    expiresInMins: 30,
  });
};

export const getLoggedInUser = async (token: string) => {
  return axiosClient.get(`/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const refreshSession = async (token: string) => {

  return axiosClient.post(`/auth/refresh`, {
    refreshToken: token,
    expiresInMins: 30
  })
};
