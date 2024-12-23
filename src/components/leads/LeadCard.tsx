import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Stack,
} from "@mui/material";
import Link from "next/link";

interface LeadCardProps {
  lead: Lead;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
  return (
    <Link target="_blank" href={`/leads/${lead?._id}`}>
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s",
        maxWidth: 300,
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} marginBottom={2}>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              width: 56,
              height: 56,
            }}
          >
            {lead.first_name[0]}
          </Avatar>
          <Box>
            <Typography variant="h6">
              {lead.first_name} {lead.last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {lead.location}
            </Typography>
          </Box>
        </Stack>
        <Typography variant="body1" gutterBottom>
          <strong>Package:</strong> {lead.package_name} ({lead.no_of_days} days)
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Pax:</strong> {lead.pax}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Email:</strong> {lead.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Phone:</strong> +{lead.country_code} {lead.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Instagram:</strong> @{lead.instagram_user_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Created At:</strong>{" "}
          {new Date(lead.createdAt).toLocaleDateString()} |{" "}
          {new Date(lead.createdAt).toLocaleTimeString()}
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
};

export default LeadCard;
