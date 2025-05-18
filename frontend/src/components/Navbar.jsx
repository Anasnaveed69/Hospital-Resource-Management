import React, { useState, useCallback, useEffect } from 'react';
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
  ListItemIcon,
  Tooltip,
  useMediaQuery,
  Collapse,
  CircularProgress,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
import EventIcon from '@mui/icons-material/Event';
import HotelIcon from '@mui/icons-material/Hotel';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BuildIcon from '@mui/icons-material/Build';
import ScienceIcon from '@mui/icons-material/Science';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupIcon from '@mui/icons-material/Group';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AmbulanceIcon from '@mui/icons-material/EmergencyShare';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/Medica Centre.png';
import ErrorBoundary from './ErrorBoundary'; // You'll need to create this component
import { styled } from '@mui/material/styles';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const APPBAR_HEIGHT = 70;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #1976D2 0%, #43a047 100%)',
  backdropFilter: 'blur(10px)',
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.drawer + 1,
  height: APPBAR_HEIGHT,
  boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  textDecoration: 'none',
  padding: theme.spacing(0, 2),
  height: APPBAR_HEIGHT,
  transition: 'all 0.3s ease',
  '&:hover': {
    '& .logo-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    }
  }
}));

const BrandText = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 600,
  color: '#ffffff',
  letterSpacing: '0.02em',
  fontFamily: '"Poppins", "Roboto", sans-serif',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  '& .medi': {
    color: '#ffffff',
    fontWeight: 700,
  },
  '& .care': {
    color: '#E3F2FD',
    fontWeight: 500,
  }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  width: 45,
  height: 45,
  borderRadius: 12,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: '#fff',
  marginLeft: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 24,
  }
}));

// Organize nav items into categories
const navCategories = [
  {
    category: 'Main',
    items: [
      { label: 'Home', to: '/home', icon: <HomeIcon /> },
      { label: 'Register Patient', to: '/register-patient', icon: <PersonAddIcon /> },
      { label: 'Patients', to: '/patients', icon: <PeopleIcon /> },
      { label: 'Patient History', to: '/patient-history', icon: <HistoryIcon /> },
    ]
  },
  {
    category: 'Facilities',
    items: [
      { label: 'Appointments', to: '/assign-doctor', icon: <EventIcon /> },
      { label: 'Beds Appointment', to: '/assign-bed', icon: <HotelIcon /> },
      { label: 'Beds', to: '/beds', icon: <HotelIcon /> },
      { label: 'Rooms', to: '/rooms', icon: <MeetingRoomIcon /> },
      { label: 'Equipment', to: '/equipment', icon: <BuildIcon /> },
    ]
  },
  {
    category: 'Services',
    items: [
      { label: 'Lab Tests', to: '/lab-tests', icon: <ScienceIcon /> },
      { label: 'Pharmacy', to: '/pharmacy', icon: <LocalPharmacyIcon /> },
      { label: 'Bills', to: '/bills', icon: <ReceiptIcon /> },
      { label: 'Staff', to: '/staff', icon: <GroupIcon /> },
      { label: 'Schedules', to: '/schedules', icon: <CalendarMonthIcon /> },
    ]
  },
  {
    category: 'Emergency & Security',
    items: [
      { label: 'Ambulance Services', to: '/ambulance-services', icon: <AmbulanceIcon /> },
      { label: 'Security Incidents', to: '/security-incidents', icon: <SecurityIcon /> },
      { label: 'Alert Report', to: '/alerts', icon: <NotificationsIcon /> },
    ]
  }
];

const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(90deg, #1976D2 0%, #43a047 100%)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: '1px',
    background: 'rgba(255, 255, 255, 0.1)',
  }
}));

const CategoryButton = styled(ListItemButton)(({ theme, isExpanded }) => ({
  margin: '4px 16px',
  borderRadius: '12px',
  padding: '10px 16px',
  transition: 'all 0.3s ease',
  background: isExpanded ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
  '&:hover': {
    background: 'rgba(25, 118, 210, 0.12)',
    transform: 'translateX(4px)',
  },
  '& .MuiListItemText-primary': {
    fontSize: '0.95rem',
    fontWeight: isExpanded ? 600 : 500,
    color: isExpanded ? theme.palette.primary.main : theme.palette.text.primary,
    transition: 'all 0.3s ease',
  },
  '& .MuiSvgIcon-root': {
    transition: 'transform 0.3s ease',
    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
    color: isExpanded ? theme.palette.primary.main : theme.palette.text.secondary,
  }
}));

const MenuItemButton = styled(ListItemButton)(({ theme, isActive }) => ({
  margin: '2px 16px',
  borderRadius: '10px',
  padding: '8px 16px',
  transition: 'all 0.3s ease',
  background: isActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
  '&:hover': {
    background: 'rgba(25, 118, 210, 0.12)',
    transform: 'translateX(4px)',
  },
  '& .MuiListItemIcon-root': {
    minWidth: '32px',
    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
    transition: 'color 0.3s ease',
  },
  '& .MuiListItemText-primary': {
    fontSize: '0.875rem',
    fontWeight: isActive ? 600 : 400,
    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
    transition: 'all 0.3s ease',
  }
}));

function Navbar() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Memoized drawer toggle handler
  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  // Memoized logout handler
  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      localStorage.removeItem('isAuthenticated');
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulated logout delay
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Hide Navbar if not authenticated or on login page
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated || location.pathname === '/login') {
    return null;
  }

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? '' : category);
  };

  return (
    <ErrorBoundary>
      <StyledAppBar elevation={0}>
        <Toolbar sx={{ height: APPBAR_HEIGHT, px: { xs: 1, sm: 2, md: 4 } }}>
          <LogoContainer component={Link} to="/home">
            <Box 
              sx={{ 
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <LocalHospitalIcon 
                className="logo-icon"
                sx={{ 
                  fontSize: 40,
                  color: '#fff',
                  transition: 'transform 0.3s ease',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}
              />
            </Box>
            {!isMobile && (
              <BrandText variant="h4" component="div">
                <span className="medi">Medi</span>
                <span className="care">Care</span>
              </BrandText>
            )}
          </LogoContainer>

          <Box 
            sx={{ 
              marginLeft: 'auto', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2 
            }}
          >
            <Tooltip 
              title={drawerOpen ? "Close menu" : "Open menu"}
              placement="bottom"
              arrow
              TransitionProps={{ timeout: 600 }}
            >
              <MenuButton
                edge="end"
                onClick={handleDrawerToggle}
                aria-label={drawerOpen ? 'close navigation menu' : 'open navigation menu'}
                aria-expanded={drawerOpen}
              >
                {drawerOpen ? <CloseIcon /> : <MenuIcon />}
              </MenuButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </StyledAppBar>

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
            width: 280,
            background: '#ffffff',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            top: APPBAR_HEIGHT,
            height: `calc(100% - ${APPBAR_HEIGHT}px)`,
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: alpha(theme.palette.primary.main, 0.2),
              borderRadius: '10px',
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.3),
              },
            },
          },
        }}
      >
        <Slide direction="left" in={drawerOpen} mountOnEnter unmountOnExit>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
            role="navigation"
            aria-label="Main navigation"
          >
            <SidebarHeader>
              <LocalHospitalIcon 
                sx={{ 
                  fontSize: 32,
                  color: '#fff',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: '#fff',
                  fontWeight: 600,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                MediCare
              </Typography>
            </SidebarHeader>

            <List sx={{ pt: 0 }}>
              {navCategories.map((category, index) => (
                <Box key={category.category}>
                  <CategoryButton
                    onClick={() => handleCategoryClick(category.category)}
                    isExpanded={expandedCategory === category.category}
                  >
                    <ListItemText primary={category.category} />
                    <KeyboardArrowRightIcon />
                  </CategoryButton>

                  <Collapse 
                    in={expandedCategory === category.category} 
                    timeout={300}
                    sx={{
                      '& .MuiCollapse-wrapper': {
                        transition: 'all 0.3s ease',
                      }
                    }}
                  >
                    <List component="div" disablePadding>
                      {category.items.map((item, itemIndex) => (
                        <Fade
                          key={item.to}
                          in={expandedCategory === category.category}
                          timeout={200 + itemIndex * 50}
                        >
                          <ListItem disablePadding>
                            <MenuItemButton
                              component={Link}
                              to={item.to}
                              isActive={location.pathname === item.to}
                              onClick={handleDrawerToggle}
                            >
                              <ListItemIcon>{item.icon}</ListItemIcon>
                              <ListItemText primary={item.label} />
                            </MenuItemButton>
                          </ListItem>
                        </Fade>
                      ))}
                    </List>
                  </Collapse>

                  {index < navCategories.length - 1 && (
                    <Divider 
                      sx={{ 
                        my: 1,
                        mx: 2,
                        opacity: 0.08,
                      }} 
                    />
                  )}
                </Box>
              ))}
            </List>

            <Box sx={{ mt: 'auto', p: 2 }}>
              <MenuItemButton
                onClick={handleLogout}
                disabled={isLoading}
                isActive={false}
                sx={{
                  background: alpha(theme.palette.error.main, 0.04),
                  '&:hover': {
                    background: alpha(theme.palette.error.main, 0.08),
                  },
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.error.main,
                  },
                  '& .MuiListItemText-primary': {
                    color: theme.palette.error.main,
                    fontWeight: 500,
                  },
                }}
              >
                <ListItemIcon>
                  {isLoading ? (
                    <CircularProgress size={20} color="error" />
                  ) : (
                    <LogoutIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItemButton>
            </Box>
          </Box>
        </Slide>
      </Drawer>
    </ErrorBoundary>
  );
}

export default Navbar;