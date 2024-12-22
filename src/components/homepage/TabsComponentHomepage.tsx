"use client";

import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import Leads from "../../../Leads.json";
import DetailCard from "../about/DetailCard";

interface UserTableProps {
  users: User[];
}

const TabsComponentHomepage: React.FC<UserTableProps> = ({ users }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="tabs example"
        centered
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          marginBottom: "1.5rem",
        }}
      >
        <Tab label="Users" />
        <Tab label="Leads" />
      </Tabs>

      {/* Tab Panel for Users */}
      {selectedTab === 0 && (
        <Stack direction="column" spacing={3}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {users.map((user) => (
              <DetailCard key={user.id} user={user} />
            ))}
          </Box>
        </Stack>
      )}

      {/* Tab Panel for Leads */}
      {selectedTab === 1 && (
        <Stack direction="column" spacing={3}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {Leads.map((lead) => (
              <Card
                key={lead.id}
                sx={{
                  width: "100%",
                  maxWidth: "350px", // Set a fixed width for all boxes
                  borderRadius: 3,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: "1rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Package ID: {lead.package_id}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    <strong>Lead Owner:</strong> {lead.lead_owner}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    <strong>Created:</strong> {lead.lead_created_date}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    <strong>Status:</strong> {lead.lead_status}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      borderRadius: 1,
                      boxShadow: 1,
                      "&:hover": { boxShadow: 2 },
                    }}
                  >
                    View More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Stack>
      )}
    </div>
  );
};

export default TabsComponentHomepage;
