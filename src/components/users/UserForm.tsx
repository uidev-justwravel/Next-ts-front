import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Divider,
  Stack,
} from "@mui/material";

interface User {
  firstName: string;
  lastName: string;
  age: number;
}

const UserForm: React.FC<{ onSubmit: (user: User) => void }> = ({ onSubmit }) => {
  // Individual states for each input field
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number | string>("");

  // Errors mapped to string messages
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof User, string>> = {};
    if (!firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!age || Number(age) <= 0) newErrors.age = "Age must be greater than 0.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      const formData: User = {
        firstName,
        lastName,
        age: Number(age),
      };
      console.log("Form Data:", formData); // Logs the form values
      onSubmit(formData);

      // Clear form inputs after submission
      setFirstName("");
      setLastName("");
      setAge("");
    }
  };

  return (
    <Paper
      sx={{
        maxWidth: 500,
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
        <Stack spacing={3}>
          {/* First Name */}
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* Last Name */}
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* Age */}
          <TextField
            label="Age"
            type="number"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
            error={!!errors.age}
            helperText={errors.age}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* Submit Button */}
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
        </Stack>
      </Box>
    </Paper>
  );
};

export default UserForm;
