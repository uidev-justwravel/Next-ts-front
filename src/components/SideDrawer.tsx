"use client";

import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ProfileComponent from "./authentication/ProfileComponent";

const drawerWidth = 240;

const modules = [
  { name: "Home", icon: <HomeIcon />, route: "/" },
  { name: "Leads", icon: <AssignmentIcon />, route: "/leads" },
  { name: "User", icon: <PersonIcon />, route: "/user" },
  { name: "About", icon: <InfoIcon />, route: "/about" },
];

const SideDrawer: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(true);
  const pathname = usePathname();

  //   toggling sidebar function
  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        position: "absolute",
      }}
    >
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar
    position="fixed"
    sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      backgroundColor: "#1976d2",
    }}
  >
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Left section (Menu Icon + Image) */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Image
          src="https://www.justwravel.com/_next/static/media/JW-logo-dark.ec2abfdd.png"
          alt="JustWravel Logo"
          height={300}
          width={300}
          style={{
            width: "10.5rem",
            height: "2.5rem",
          }}
        />
      </Box>

      {/* Right section (Logout Button) */}
      <ProfileComponent/>
    </Toolbar>
  </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: isSidebarOpen ? drawerWidth : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? drawerWidth : 60,
            boxSizing: "border-box",
            backgroundColor: "#1c2536",
            color: "#ffffff",
            overflowX: "hidden",
            transition: "width 0.3s",
            position: "fixed",
            height: "100vh",
            borderRight: "1px solid #1c2536",
          },
        }}
      >
        <Toolbar />
        <List>
          {modules.map((module) => (
            <ListItem key={module.name} disablePadding>
              <Tooltip
                title={isSidebarOpen ? "" : module.name}
                placement="right"
                arrow
              >
                <ListItemButton
                  component={Link}
                  href={module.route}
                  sx={{
                    justifyContent: isSidebarOpen ? "initial" : "center",
                    px: 2.5,
                    "&:hover": {
                      backgroundColor: "#1976d2",
                      color: "#ffffff",
                    },
                    backgroundColor:
                      pathname === module.route ? "#1976d2" : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isSidebarOpen ? 3 : "auto",
                      justifyContent: "center",
                      color: "#ffffff",
                    }}
                  >
                    {module.icon}
                  </ListItemIcon>

                  {isSidebarOpen && <ListItemText primary={module.name} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <Divider
          sx={{ backgroundColor: "#444c56", margin: "8px 0", opacity: 0.5 }}
        />
        <Box
          sx={{
            textAlign: "center",
            padding: isSidebarOpen ? "16px" : "8px",
            fontSize: isSidebarOpen ? "14px" : "10px",
            color: "#a0aab8",
          }}
        >
          {isSidebarOpen ? "© 2024 JustWravel App" : ""}
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideDrawer;
