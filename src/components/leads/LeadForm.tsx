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

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const LeadForm: React.FC<{ onSubmit: (lead: Lead) => void }> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Omit<Lead, "id">>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Omit<Lead, "id">>>({});

  const handleChange = (field: keyof Omit<Lead, "id">, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" }); // Clear errors on change
  };

  const validate = () => {
    const newErrors: Partial<Omit<Lead, "id">> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "A valid email is required";
    if (!formData.phone.trim() || !/^\+?\d{10,15}$/.test(formData.phone))
      newErrors.phone = "A valid phone number is required (e.g., +1234567890)";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      const newLead = {
        id: Math.floor(Math.random() * 1000) + 1,
        ...formData,
      };
      onSubmit(newLead);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
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
        Create New Lead
      </Typography>
      <Divider sx={{ mb: 3, borderColor: "#cfd8dc" }} />
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
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

          {/* Company */}
          <Grid item xs={12}>
            <TextField
              label="Company"
              fullWidth
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              error={!!errors.company}
              helperText={errors.company}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Message */}
          <Grid item xs={12}>
            <TextField
              label="Message"
              fullWidth
              multiline
              rows={3}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              error={!!errors.message}
              helperText={errors.message}
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
  const handleLeadSubmit = (newLead: Lead) => {
    alert("Lead Created Successfully!");
  };

  return <LeadForm onSubmit={handleLeadSubmit} />;
}
