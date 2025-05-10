import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  Slide,
  Divider,
  Fade,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/Medica Centre.png';

const navItems = [
  { label: 'Home', to: '/home' }, // Use /home for consistency
  { label: 'Register Patient', to: '/register-patient' },
  { label: 'Patients', to: '/patients' },
  { label: 'Patient History', to: '/patient-history' },
  { label: 'Appointments', to: '/assign-doctor' },
  { label: 'Beds Appointment', to: '/assign-bed' },
  { label: 'Beds', to: '/beds' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Equipment', to: '/equipment' },
  { label: 'Lab Tests', to: '/lab-tests' },
  { label: 'Pharmacy', to: '/pharmacy' },
  { label: 'Bills', to: '/bills' },
  { label: 'Staff', to: '/staff' },
  { label: 'Schedules', to: '/schedules' },
  { label: 'Ambulance Services', to: '/ambulance-services' },
  { label: 'Security Incidents', to: '/security-incidents' },
  { label: 'Alert Report', to: '/alerts' },
  // { label: 'Patient Feedback', to: '/feedback' },
];

const APPBAR_HEIGHT = 72;

function Navbar() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Hide Navbar if not authenticated or on login page
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated || location.pathname === '/login') {
    return null;
  }

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login', { replace: true });
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(90deg, #1976D2 70%, #43a047 100%)',
          color: '#FFFFFF',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: `${APPBAR_HEIGHT}px` }}>
          {/* Logo and brand */}
          <Box
            component={Link}
            to="/home"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              gap: 1.5,
            }}
          >
            <img src={logo} alt="MediCare Logo" style={{ height: 65, marginLeft: 12, marginTop: 3 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#fff',
                letterSpacing: 1,
                ml: 1,
                display: { xs: 'none', sm: 'block' },
                userSelect: 'none',
              }}
            >
              {/* Optional: Add brand name here */}
            </Typography>
          </Box>
          {/* Hamburger menu icon (always visible) */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDrawerToggle}
            aria-label={drawerOpen ? 'close navigation menu' : 'open navigation menu'}
            sx={{
              transition: 'transform 0.2s cubic-bezier(.4,2,.6,1)',
              transform: drawerOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              ml: 1,
            }}
          >
            {drawerOpen ? <CloseIcon sx={{ fontSize: 32 }} /> : <MenuIcon sx={{ fontSize: 32 }} />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer BELOW the AppBar */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        transitionDuration={350}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: 270,
            background: '#1976D2',
            color: '#fff',
            borderTopLeftRadius: 18,
            borderBottomLeftRadius: 18,
            boxShadow: '0 8px 32px rgba(25,118,210,0.15)',
            transition: 'all 0.35s cubic-bezier(.4,2,.6,1)',
            overflow: 'hidden',
            position: 'fixed',
            top: `${APPBAR_HEIGHT}px`,
            height: `calc(100% - ${APPBAR_HEIGHT}px)`,
            display: 'flex',
            flexDirection: 'column',
            p: 0,
          },
        }}
      >
        <Slide direction="left" in={drawerOpen} mountOnEnter unmountOnExit>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header/logo area */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 2,
                background: 'rgba(25,118,210,0.15)',
                gap: 1.5,
                flexShrink: 0,
              }}
            >
              <img src={logo} alt="MediCare Logo" style={{ height: 90, marginLeft: 60, marginTop: 3 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', ml: 1 }}>
              </Typography>
            </Box>
            <Divider sx={{ mb: 1, background: 'rgba(255,255,255,0.15)' }} />
            {/* Scrollable nav list */}
            <Box sx={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              <List>
                {navItems.map((item, idx) => (
                  <Fade in={drawerOpen} timeout={400 + idx * 40} key={item.to}>
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to={item.to}
                        selected={location.pathname === item.to}
                        onClick={handleDrawerToggle}
                        sx={{
                          color: location.pathname === item.to ? '#00008B' : '#fff',
                          fontWeight: location.pathname === item.to ? 700 : 500,
                          borderRadius: 1.5,
                          mx: 1,
                          my: 0.5,
                          px: 2,
                          py: 1,
                          transition: 'background 0.2s, color 0.2s',
                          '&.Mui-selected': {
                            background: 'rgba(0,0,139,0.08)',
                            color: '#00008B',
                          },
                          '&:hover': {
                            background: 'rgba(255,255,255,0.10)',
                          },
                        }}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  </Fade>
                ))}
                {/* Logout button in the drawer */}
                <ListItem disablePadding sx={{ mt: 2 }}>
                  <ListItemButton
                    onClick={() => {
                      handleDrawerToggle();
                      handleLogout();
                    }}
                    sx={{
                      color: '#fff',
                      fontWeight: 700,
                      borderRadius: 1.5,
                      mx: 1,
                      my: 0.5,
                      px: 2,
                      py: 1,
                      background: 'rgba(255,0,0,0.15)',
                      '&:hover': {
                        background: 'rgba(255,0,0,0.25)',
                        color: '#fff',
                      },
                    }}
                  >
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Box>
        </Slide>
      </Drawer>
    </>
  );
}

export default Navbar;
