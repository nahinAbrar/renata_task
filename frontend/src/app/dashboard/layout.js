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
import PieChartIcon from "@mui/icons-material/PieChart";
import ThemeProviderClient from "@/components/ThemeProviderClient";
import { FilterProvider } from "@/contexts/FilterContext";
import { useAuth } from "@/utils/useAuth";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import TimelineIcon from '@mui/icons-material/Timeline';

const drawerWidth = 240;
const navItems = [
  { label: "Home", href: "/dashboard", icon: <HomeIcon /> },
  { label: "Bar Chart", href: "/dashboard/bar", icon: <BarChartIcon /> },
  { label: "Gender Split", href: "/dashboard/gender", icon: <PieChartIcon /> },
  { label: "Age Histogram", href: "/dashboard/age", icon: <TimelineIcon /> },
];

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { username, role, realRole } = useAuth();


  useEffect(() => {
    if (!sessionStorage.getItem("role")) router.replace("/login");
  }, [router]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleLogout = () => {
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("username");          
    router.push("/login");
  };

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
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

      {/* Mobile‑only logout */}
      <Box sx={{ p: 2, display: { md: "none" } }}>
        <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <ThemeProviderClient>
      <FilterProvider>
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

              {/* ← Welcome & role badge */}
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                <Typography variant="body1">
                  Welcome{username ? `, ${username}` : ""}
                </Typography>
                {role && (
                  <Typography
                    variant="caption"
                    sx={{
                      ml: 1,
                      px: 1,
                      py: 0.25,
                      bgcolor: "primary.light",
                      borderRadius: 1,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "primary.contrastText"
                    }}
                  >
                    {role}
                  </Typography>
                )}
              </Box>

              {/* Toggles */}
              {realRole === "Admin" && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={role === "SalesRep"}
                      size="small"
                      onChange={e => {
                        const newView = e.target.checked ? "SalesRep" : "Admin";
                        sessionStorage.setItem("role", newView);
                        // no reload: update auth state by forcing a re-render
                        window.location.reload();
                      }}
                    />
                  }
                  label="Toggle SalesRep"
                  sx={{ mr: 2 }}
                />
              )}



              {/* Desktop‑only Logout */}
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
      </FilterProvider>
    </ThemeProviderClient>
  );
}
