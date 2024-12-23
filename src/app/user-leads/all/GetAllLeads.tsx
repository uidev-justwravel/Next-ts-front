"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { deleteLead, getAllLeads } from "@/restAPIs/leads";
import Link from "next/link";

const demoLeads = [
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
    lead_status: "Converted",
  },
  {
    id: 4,
    package_id: 104,
    lead_owner: "Emily Davis",
    lead_created_date: "2024-12-04",
    lead_status: "Contacted",
  },
  {
    id: 5,
    package_id: 105,
    lead_owner: "David Martinez",
    lead_created_date: "2024-12-05",
    lead_status: "Closed",
  },
];

interface Lead {
  id: number;
  package_id: number;
  lead_owner: string;
  lead_created_date: string;
  lead_status: string;
}

// interface LeadTableProps {
//   leads: Lead[];
// }

const ShowLeads = () => {
  const [leads, setLeads] = React.useState([]);

  // const getAllLeadData = async () => {
  //   const res = await getAllLeads();
  //   if (res.status === 200) {
  //     setLeads(res.data);
  //   }
  // };

  // useEffect(() => {
  //   getAllLeadData();
  // }, []);

  const handleLeadDelete = async (id: number) => {
    const res = await deleteLead(id);
    if (res.status === 200) {
      console.log("lead deleted successfully");
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 900, margin: "auto", mt: 5 }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mt: 2 }}>
        Lead Management
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>ID</strong>
            </TableCell>
            <TableCell>
              <strong>Package ID</strong>
            </TableCell>
            <TableCell>
              <strong>Lead Owner</strong>
            </TableCell>
            <TableCell>
              <strong>Created Date</strong>
            </TableCell>
            <TableCell>
              <strong>Status</strong>
            </TableCell>
            <TableCell>
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demoLeads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.id}</TableCell>
              <TableCell>{lead.package_id}</TableCell>
              <TableCell>{lead.lead_owner}</TableCell>
              <TableCell>{lead.lead_created_date}</TableCell>
              <TableCell>{lead.lead_status}</TableCell>

              <TableCell>
                <Button onClick={() => handleLeadDelete(lead.id)}>
                  Delete
                </Button>
              </TableCell>

              <TableCell>
                <Link href="/user-leads/add">
                  <Button variant="contained" color="primary">
                    Add
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowLeads;
