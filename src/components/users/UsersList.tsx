"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
  Box,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";

// Define the User type
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  }>({
    key: "id",
    direction: "asc",
  });

  // Sorting logic
  const handleSort = (key: keyof User) => {
    const isAsc = sortConfig.key === key && sortConfig.direction === "asc";
    setSortConfig({ key, direction: isAsc ? "desc" : "asc" });
  };

  const sortedUsers = [...users].sort((a, b) => {
    const key = sortConfig.key;
    if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filtering logic
  const filteredUsers = sortedUsers.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.first_name.toLowerCase().includes(query) ||
      user.last_name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.includes(query) ||
      user.address.toLowerCase().includes(query)
    );
  });

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        p: 2,
        backgroundColor: "#f7f7f7",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#333",
          }}
        >
          User List
        </Typography>
        <Link href="/user/add" passHref>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              textTransform: "capitalize",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#145a90",
              },
            }}
          >
            Add New
          </Button>
        </Link>
      </Box>

      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          sx={{
            maxWidth: 500,
            backgroundColor: "#fff",
            borderRadius: 1,
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Table */}
      <TableContainer
        sx={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortConfig.key === "id"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("id")}
                  sx={{ color: "inherit" }}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortConfig.key === "first_name"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("first_name")}
                  sx={{ color: "inherit" }}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortConfig.key === "last_name"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("last_name")}
                  sx={{ color: "inherit" }}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortConfig.key === "email"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("email")}
                  sx={{ color: "inherit" }}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Phone
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Address
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                  "&:hover": { backgroundColor: "#f1f1f1" },
                }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default function App() {
  const users: User[] = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      date_of_birth: "1990-05-14",
      address: "1234 Elm Street, Springfield, IL",
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      phone: "+9876543210",
      date_of_birth: "1985-10-21",
      address: "5678 Oak Street, Metropolis, NY",
    },
    // Add more users...
  ];

  return <UserTable users={users} />;
}
