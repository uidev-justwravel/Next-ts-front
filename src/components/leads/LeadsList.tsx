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

// Define the Lead type
interface Lead {
  id: number;
  package_id: number;
  lead_owner: string;
  lead_created_date: string;
  lead_status: string;
}

interface LeadTableProps {
  leads: Lead[];
}

const LeadTable: React.FC<LeadTableProps> = ({ leads }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead;
    direction: "asc" | "desc";
  }>({
    key: "id",
    direction: "asc",
  });

  // Sorting logic
  const handleSort = (key: keyof Lead) => {
    const isAsc = sortConfig.key === key && sortConfig.direction === "asc";
    setSortConfig({ key, direction: isAsc ? "desc" : "asc" });
  };

  const sortedLeads = [...leads].sort((a, b) => {
    const key = sortConfig.key;
    if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filtering logic
  const filteredLeads = sortedLeads.filter((lead) => {
    const query = searchQuery.toLowerCase();
    return (
      lead.lead_owner.toLowerCase().includes(query) ||
      lead.lead_status.toLowerCase().includes(query) ||
      lead.lead_created_date.toLowerCase().includes(query)
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
          Lead List
        </Typography>
        <Link href="/leads/add" passHref>
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
          label="Search Leads"
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
                Package ID
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortConfig.key === "lead_owner"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("lead_owner")}
                  sx={{ color: "inherit" }}
                >
                  Lead Owner
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortConfig.key === "lead_created_date"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("lead_created_date")}
                  sx={{ color: "inherit" }}
                >
                  Created Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                Lead Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.map((lead, index) => (
              <TableRow
                key={lead.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                  "&:hover": { backgroundColor: "#f1f1f1" },
                }}
              >
                <TableCell>{lead.id}</TableCell>
                <TableCell>{lead.package_id}</TableCell>
                <TableCell>{lead.lead_owner}</TableCell>
                <TableCell>{lead.lead_created_date}</TableCell>
                <TableCell>{lead.lead_status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default function App() {
  const leads: Lead[] = [
    {
      id: 1,
      package_id: 101,
      lead_owner: "John Doe",
      lead_created_date: "2024-12-01",
      lead_status: "New",
    },
    {
      id: 2,
      package_id: 102,
      lead_owner: "Jane Smith",
      lead_created_date: "2024-12-02",
      lead_status: "In Progress",
    },
    {
      id: 3,
      package_id: 103,
      lead_owner: "Michael Johnson",
      lead_created_date: "2024-12-03",
      lead_status: "Closed",
    },
    // Add more leads...
  ];

  return <LeadTable leads={leads} />;
}
