import {
  Card,
  CardContent,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import React from 'react';
import Users from "../../../Users.json"; 
// Define the type for a user
interface User {
  id: string; // Assuming id is a string, change to number if needed
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string; // Assuming date is a string, if it's a Date object, adjust accordingly
  address: string;
}

// Define the props for UsersTab
interface UsersTabProps {
  Users: User[]; // Array of user objects
}

const UsersTab: React.FC<UsersTabProps> = () => {
  return (
    <Stack direction="column" spacing={3}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {Users.map((user) => (
          <Card
            key={user.id}
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
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                {`${user.first_name} ${user.last_name}`}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                <strong>Phone:</strong> {user.phone}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                <strong>DOB:</strong> {user.date_of_birth}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                <strong>Address:</strong> {user.address}
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
  );
};

export default UsersTab;
