"use client";
import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useRouter } from 'next/navigation'
import LeadCard from "./LeadCard"; // Importing LeadCard component

interface LeadsListProps {
  initialLeads: Lead[];
}

const LeadsList: React.FC<LeadsListProps> = ({ initialLeads }) => {
  const router = useRouter();

  const handleAddClick = () => {
    router.push("/leads/add"); // Redirect to /leads/add
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Leads
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
        >
          Add Lead
        </Button>
      </Stack>
      <Stack spacing={4} sx={{ flexWrap: "wrap", gap: 4 }} direction="row">
        {initialLeads.length > 0 &&
          initialLeads.map((lead) => <LeadCard lead={lead} key={lead._id} />)}
      </Stack>
    </Box>
  );
};

export default LeadsList;
