"use client"

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CssBaseline,
} from "@mui/material";
import { loginuser } from "@/restAPIs/authentication";
import SnackbarAlert from "@/components/common/SnackbarAlert";

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const LoginPage: React.FC = () => {
  const [openSucess, setOpenSucess] = useState<boolean>(false)
  const router = useRouter()

  const handleLoginuser = async (givemEmail: string, givenPassword: string) => {
    const res = await loginuser(givemEmail, givenPassword)
    if (res.data) {
      const { accessToken, refreshToken } = res.data;
      Cookies.set('accessToken', accessToken)
      Cookies.set('refreshToken', refreshToken)
      setOpenSucess(true)
      router.push('/')
      router.refresh()
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (email && password) {
      handleLoginuser(email, password);
    } else {
      console.error("Email or password is missing");
    }
  };


  return (
    <>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            p: 4,
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: "linear-gradient(90deg, #3f51b5, #2196f3)",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
      <SnackbarAlert
        message="logged in Successfully"
        autoHideDuration={5000}
        open={openSucess}
        setOpen={setOpenSucess}
        type="success"
      />
    </>
  );
};

export default LoginPage;
