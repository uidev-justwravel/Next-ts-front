"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Divider,
} from "@mui/material";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
}

const UserForm: React.FC<{ onSubmit: (user: User) => void }> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    address: "",
  });

  const [errors, setErrors] = useState<Partial<Omit<User, "id">>>({});

  const handleChange = (field: keyof Omit<User, "id">, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" }); // Clear errors on change
  };

  const validate = () => {
    const newErrors: Partial<Omit<User, "id">> = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "A valid email is required";
    if (!formData.phone.trim() || !/^\+?\d{10,15}$/.test(formData.phone))
      newErrors.phone = "A valid phone number is required (e.g., +1234567890)";
    if (!formData.date_of_birth.trim())
      newErrors.date_of_birth = "Date of birth is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      const newUser = {
        id: Math.floor(Math.random() * 1000) + 1,
        ...formData,
      };
      onSubmit(newUser);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        address: "",
      }); // Reset the form
    }
  };

  return (
    <Paper
      sx={{
        maxWidth: 700,
        margin: "auto",
        mt: 5,
        p: 4,
        borderRadius: 3,
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        backgroundImage: "linear-gradient(to right, #f7f9fc, #eef2f6)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: "bold",
          color: "#37474f",
        }}
      >
        Create New User
      </Typography>
      <Divider sx={{ mb: 3, borderColor: "#cfd8dc" }} />
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* First Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              value={formData.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
              error={!!errors.first_name}
              helperText={errors.first_name}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              fullWidth
              value={formData.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
              error={!!errors.last_name}
              helperText={errors.last_name}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12}>
            <TextField
              label="Phone"
              fullWidth
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.date_of_birth}
              onChange={(e) => handleChange("date_of_birth", e.target.value)}
              error={!!errors.date_of_birth}
              helperText={errors.date_of_birth}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              label="Address"
              fullWidth
              multiline
              rows={3}
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              backgroundColor: "#1976d2",
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
              "&:hover": {
                backgroundColor: "#115293",
                transform: "scale(1.05)",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default function App() {
  const handleUserSubmit = (newUser: User) => {
    console.log("New User Created:", newUser);
    alert("User Created Successfully!");
  };

  return <UserForm onSubmit={handleUserSubmit} />;
}
