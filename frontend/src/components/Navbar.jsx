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
  Switch,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/Medica Centre.png';

const navItems = [
  { label: 'Home', to: '/' },
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
  { label: 'Patient Feedback', to: '/feedback' },
];

const APPBAR_HEIGHT = 72;

function Navbar({ toggleTheme, isDarkMode }) {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(90deg, #1565C0 30%, #388E3C 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          zIndex: theme.zIndex.drawer + 1,
        }}
        component={motion.div}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: `${APPBAR_HEIGHT}px` }}>
          {/* Logo and brand */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              gap: 1.5,
            }}
          >
            <motion.img
              src={logo}
              alt="MediCare Logo"
              style={{ height: 65, marginLeft: 12, marginTop: 3 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
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
              MediCare
            </Typography>
          </Box>
          {/* Theme toggle and hamburger menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Typography variant="body2" sx={{ color: '#fff', mr: 1, fontWeight: 500 }}>
                  {isDarkMode ? 'Dark' : 'Light'} Mode
                </Typography>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Switch
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  icon={<Brightness7Icon />}
                  checkedIcon={<Brightness4Icon />}
                  color="default"
                />
              </motion.div>
            </Box>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleDrawerToggle}
                aria-label={drawerOpen ? 'close navigation menu' : 'open navigation menu'}
                sx={{
                  transition: 'transform 0.2s cubic-bezier(.4,2,.6,1)',
                  transform: drawerOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                }}
              >
                {drawerOpen ? <CloseIcon sx={{ fontSize: 32 }} /> : <MenuIcon sx={{ fontSize: 32 }} />}
              </IconButton>
            </motion.div>
          </Box>
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
            background: 'linear-gradient(180deg, #1565C0 0%, #1976D2 100%)',
            color: '#fff',
            borderTopLeftRadius: 18,
            borderBottomLeftRadius: 18,
            boxShadow: '0 8px 32px rgba(21,101,192,0.2)',
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
                background: 'rgba(21,101,192,0.15)',
                gap: 1.5,
                flexShrink: 0,
              }}
            >
              <motion.img
                src={logo}
                alt="MediCare Logo"
                style={{ height: 90, marginLeft: 60, marginTop: 3 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', ml: 1 }}>
                MediCare
              </Typography>
            </Box>
            <Divider sx={{ mb: 1, background: 'rgba(255,255,255,0.2)' }} />
            {/* Scrollable nav list */}
            <Box sx={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              <List>
                {navItems.map((item, idx) => (
                  <Fade in={drawerOpen} timeout={400 + idx * 40} key={item.to}>
                    <ListItem disablePadding>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ListItemButton
                          component={Link}
                          to={item.to}
                          selected={location.pathname === item.to}
                          onClick={handleDrawerToggle}
                          sx={{
                            color: location.pathname === item.to ? '#E3F2FD' : '#fff',
                            fontWeight: location.pathname === item.to ? 700 : 500,
                            borderRadius: 1.5,
                            mx: 1,
                            my: 0.5,
                            px: 2,
                            py: 1,
                            transition: 'background 0.2s, color 0.2s',
                            '&.Mui-selected': {
                              background: 'rgba(255,255,255,0.15)',
                              color: '#E3F2FD',
                            },
                            '&:hover': {
                              background: 'rgba(255,255,255,0.2)',
                            },
                          }}
                        >
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </motion.div>
                    </ListItem>
                  </Fade>
                ))}
              </List>
            </Box>
            {/* Logout button */}
            <Box sx={{ p: 2, mt: 'auto' }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={handleLogout}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    background: '#d32f2f',
                    '&:hover': {
                      background: '#b71c1c',
                      boxShadow: '0 4px 12px rgba(211,47,47,0.3)',
                    },
                  }}
                >
                  Logout
                </Button>
              </motion.div>
            </Box>
          </Box>
        </Slide>
      </Drawer>
    </>
  );
}

export default Navbar;