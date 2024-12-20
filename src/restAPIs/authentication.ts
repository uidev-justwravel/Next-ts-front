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

  /* providing accessToken in bearer */
  // fetch("https://dummyjson.com/auth/me", {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${token}`, // Pass JWT via Authorization header
  //   },
  //   credentials: "include", // Include cookies (e.g., accessToken) in the request
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data, "data"));
};

export const refreshSession = async (token:string) => {

return axiosClient.post(`/auth/refresh`, {
  refreshToken: token,
  expiresInMins: 30
})
};
