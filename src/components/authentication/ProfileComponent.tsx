import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Fade } from "@mui/material";
import LogoutComponent from "./LogoutComponent";
import ProfileDetailComponent from "./ProfileDetailComponent";

import Cookies from 'js-cookie'

const ProfileComponent: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState<string>();
  const [userImage, setUserImage] = useState<string>();
  useEffect(() => {
    const user = Cookies.get('user')

    if (user) {
      const parsedUser = JSON.parse(user); // Assuming user data is stored as a JSON string
      setUserName(parsedUser.firstName + parsedUser.lastName);
      setUserImage(parsedUser.image);
    }
  }, []);

  // Handlers to open and close modal when hovering over either the avatar or the modal
  const handleMouseEnter = () => setOpenModal(true);
  const handleMouseLeave = () => setOpenModal(false);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        right: "20px", // Place it in the top-right corner
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Avatar
        alt={userName}
        src={userImage}
        sx={{
          width: 50,
          height: 50,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)", // Slight zoom effect on hover for added interactivity
          },
        }}
      />

      <Fade in={openModal} timeout={200}>
        <Box
          sx={{
            position: "absolute",
            top: "50px", // Modal will appear right below the avatar
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            padding: "12px 4px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            width: "200px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "8px",
            zIndex: 9999, // Ensure the modal is above other elements
            opacity: openModal ? 1 : 0, // Smooth opacity transition
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={handleMouseEnter} // Keep modal open when hovering over it
          onMouseLeave={handleMouseLeave} // Close modal when leaving
        >
          <Avatar
            alt={userName}
            src={userImage}
            sx={{ width: 40, height: 40 }}
          />
          <Typography
            variant="body2"
            sx={{ fontSize: "14px", marginTop: "8px", color: 'black', fontWeight: 'bold' }}
          >
            {userName}
          </Typography>
          <div
            style={{
              margin: "8px 0",
              width: "100%",
              height: "1px",
              backgroundColor: "#ddd",
            }}
          ></div>
          <ProfileDetailComponent />
          <LogoutComponent />
        </Box>
      </Fade>
    </div>
  );
};

export default ProfileComponent;
