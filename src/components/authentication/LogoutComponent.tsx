import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

const LogoutComponent = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log("User logged out");
    setOpen(false);
    router.push('/login')
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        sx={{
          marginTop: "4px",
          fontSize: "14px",
          padding: "8px 16px",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#d32f2f",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          },
        }}
        onClick={handleClickOpen}
      >
        Logout
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)", // Beautiful shadow effect
            minWidth: "300px", // Make the dialog smaller
            maxWidth: "400px", // Max width to keep it compact
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          <Typography variant="h6" sx={{ color: "#333" }}>
            Do you really want to log out?
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", paddingBottom: "20px" }}>
          <Typography variant="body1" sx={{ color: "#555" }}>
            You will be logged out of your account. Are you sure you want to
            continue?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
          <Button
            onClick={handleClose}
            color="primary"
            sx={{
              fontSize: "14px",
              padding: "6px 16px",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            color="error"
            autoFocus
            sx={{
              fontSize: "14px",
              padding: "6px 16px",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#c62828",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                color: "white", // This will make the text color white on hover
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogoutComponent;
