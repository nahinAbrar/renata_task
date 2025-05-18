// src/app/dashboard/layout.js
"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import SpeedIcon from "@mui/icons-material/Speed";

import ThemeProviderClient from "@/components/ThemeProviderClient";

const drawerWidth = 240;
const navItems = [
  { label: "Home",        href: "/dashboard",      icon: <HomeIcon /> },
  { label: "Bar Chart",   href: "/dashboard/bar",  icon: <BarChartIcon /> },
  { label: "Gauge Chart", href: "/dashboard/gauge",icon: <SpeedIcon /> },
];

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("role")) router.replace("/login");
  }, [router]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleLogout = () => {
    sessionStorage.removeItem("role");
    router.push("/login");
  };

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%"}}>
      <Toolbar sx={{ justifyContent: "center"}}>
        <Typography variant="h6" className="md:hidden">RENATA</Typography>
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {navItems.map(({ label, href, icon }) => (
          <ListItem key={href} disablePadding>
            <ListItemButton
              component="a"
              href={href}
              selected={pathname === href}
              sx={{
                borderLeft: pathname === href
                  ? "4px solid primary.main"
                  : "4px solid transparent"
              }}
            >
              <ListItemIcon sx={{ color: pathname === href ? "primary.main" : "inherit" }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Mobile‐only logout */}
      <Box sx={{ p: 2, display: { md: "none" } }}>
        <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <ThemeProviderClient>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* AppBar offset by drawerWidth on md+ */}
        <AppBar
          position="fixed"
          color="transparent"
          elevation={1}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            ml: { md: `${drawerWidth}px` }
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Analytics Dashboard
            </Typography>
            {/* Desktop‐only Logout */}
            <Button
              color="error"
              onClick={handleLogout}
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawers */}
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { width: drawerWidth }
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": { width: drawerWidth }
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main Content offset by drawerWidth on md+ */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: { md: `${drawerWidth}px` },
            mt: 8,
            overflow: "auto"
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProviderClient>
  );
}
