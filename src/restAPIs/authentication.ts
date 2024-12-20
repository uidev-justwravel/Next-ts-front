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

export const getLoggedInUser = async () => {
  /* providing accessToken in bearer */
  fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, // Pass JWT via Authorization header
    },
    credentials: 'include' // Include cookies (e.g., accessToken) in the request
  })
    .then(res => res.json())
    .then((data) => console.log(data));
};

export const refreshSession = async () => {
  fetch('https://dummyjson.com/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3MzQ2NDMxOTUsImV4cCI6MTczNzIzNTE5NX0.3s7Mq6z6Nuh8Prjcs_sN-BixiyW8hNtcQWkvAUNR5oI', // Optional, if not provided, the server will use the cookie
      expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60 
    }),
    credentials: 'include' // Include cookies (e.g., accessToken) in the request
  })
    .then(res => res.json())
    .then((e) => {
      console.log(e)
    });
};
