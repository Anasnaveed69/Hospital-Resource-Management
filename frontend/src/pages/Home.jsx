import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Link as MuiLink,
  Fade,
  Slide,
  Container,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import posterImg from '../assets/Poster.jpg';

const features = [
  {
    title: 'Patient Management',
    description: 'Monitor and manage patient records, appointments, and treatments efficiently.',
    icon: <PeopleIcon fontSize="large" sx={{ color: '#00B8D9' }} />,
  },
  {
    title: 'Staff Management',
    description: 'Efficiently manage hospital staff schedules, roles, and payroll operations.',
    icon: <LocalHospitalIcon fontSize="large" sx={{ color: '#36B37E' }} />,
  },
  {
    title: 'Billing & Payments',
    description: 'Streamline billing, insurance claims, and patient payments.',
    icon: <ReceiptIcon fontSize="large" sx={{ color: '#0052CC' }} />,
  },
  {
    title: 'Pharmacy Management',
    description: 'Track medications, inventory, and prescriptions effectively.',
    icon: <LocalPharmacyIcon fontSize="large" sx={{ color: '#36B37E' }} />,
  },
  {
    title: 'Equipment Management',
    description: 'Oversee medical equipment inventory, maintenance schedules, and allocation across departments.',
    icon: <MedicalServicesIcon fontSize="large" sx={{ color: '#00B8D9' }} />,
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  autoplay: true,
  autoplaySpeed: 6500,
  slidesToShow: 2,
  slidesToScroll: 1,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login", { replace: false });
  };

  return (
    <Box sx={{
      fontFamily: "'Inter', 'Roboto', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#F4F7FA',
      position: 'relative',
    }}>
      {/* Logout Button */}
      <Box sx={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          sx={{
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            py: 1,
            borderColor: '#0052CC',
            color: '#0052CC',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,82,204,0.04)',
            '&:hover': {
              background: '#F4F7FA',
              borderColor: '#00B8D9',
              color: '#00B8D9',
            },
            transition: 'all 0.2s',
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: { xs: '65vh', md: '85vh' },
          backgroundImage: `linear-gradient(120deg, rgba(0, 82, 204, 0.63) 60%, rgba(0, 217, 76, 0.7) 100%), url(${posterImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: { xs: 2, md: 0 },
          boxShadow: '0 10px 40px 0 rgba(0,82,204,0.10)',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '70%', lg: '60%' },
            mx: 'auto',
            py: { xs: 8, md: 0 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <Slide direction="down" in timeout={1000}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                letterSpacing: 2,
                mb: 3,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                textShadow: '0 6px 28px rgba(0,82,204,0.22)',
                background: 'linear-gradient(90deg, #fff 30%,rgb(206, 206, 206) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                animation: 'float 4s ease-in-out infinite',
                '@keyframes float': {
                  '0%,100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-12px)' },
                },
              }}
            >
              Welcome to MediCare
            </Typography>
          </Slide>
          <Fade in timeout={1500}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                mb: 5,
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                textShadow: '0 2px 12px rgba(0,82,204,0.11)',
                lineHeight: 1.5,
                color: '#E1F5FE',
              }}
            >
              A Smart Hospital Resource Management System that enhances patient care and administrative efficiency.
            </Typography>
          </Fade>
          <Fade in timeout={2000}>
            <Button
              variant="contained"
              size="large"
              sx={{
                fontWeight: 700,
                borderRadius: 8,
                px: 5,
                py: 1.8,
                fontSize: '1.2rem',
                textTransform: 'none',
                background: 'linear-gradient(90deg, #00B8D9 0%, #36B37E 100%)',
                color: '#fff',
                boxShadow: '0 6px 24px 0 rgba(0,184,217,0.17)',
                transition: 'all 0.25s cubic-bezier(.25,.8,.25,1)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #36B37E 0%, #00B8D9 100%)',
                  boxShadow: '0 8px 32px 0 rgba(0,184,217,0.25)',
                  transform: 'scale(1.06)',
                },
              }}
            >
              Get Started
            </Button>
          </Fade>
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #F4F7FA 70%, #E1F5FE 100%)',
          py: { xs: 6, md: 10 },
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 900,
              color: '#0052CC',
              mb: 4,
              letterSpacing: 1,
              textShadow: '0 3px 20px rgba(0,82,204,0.10)',
            }}
          >
            Key Features
          </Typography>
          <Slider {...sliderSettings}>
            {features.map((feature, index) => (
              <Box key={index} px={2}>
                <Slide direction="up" in timeout={900 + index * 200}>
                  <Paper
                    elevation={8}
                    sx={{
                      p: { xs: 4, md: 5 },
                      minHeight: 320,
                      borderRadius: '24px',
                      textAlign: 'center',
                      backgroundColor: '#fff',
                      border: '1px solid #E1F5FE',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'default',
                      transition: 'all 0.35s cubic-bezier(.25,.8,.25,1)',
                      boxShadow: '0 8px 32px rgba(0,82,204,0.07)',
                      '&:hover': {
                        boxShadow: '0 16px 48px rgba(0,184,217,0.13), 0 0 0 4px #00B8D922',
                        transform: 'translateY(-10px) scale(1.05)',
                        borderColor: '#00B8D9',
                      },
                    }}
                  >
                    <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        mb: 2,
                        color: '#0052CC',
                        letterSpacing: 0.3,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#222B45', fontSize: '1.1rem' }}>
                      {feature.description}
                    </Typography>
                  </Paper>
                </Slide>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: '100vw',
          background: 'linear-gradient(90deg, #0052CC 70%, #00B8D9 100%)',
          py: 4,
          mt: 'auto',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          color: '#e3f2fd',
          fontWeight: 400,
          fontSize: '0.95rem',
          textAlign: 'center',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            height:12
          }}
        >
          <Typography>
            © {new Date().getFullYear()} MediCare | All Rights Reserved
          </Typography>
          <Box>
            <IconButton
              aria-label="Facebook"
              component={MuiLink}
              href="https://facebook.com"
              target="_blank"
              rel="noopener"
              sx={{ color: '#e3f2fd', '&:hover': { color: '#00B8D9' }, transition: 'color 0.2s' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="Twitter"
              component={MuiLink}
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              sx={{ color: '#e3f2fd', '&:hover': { color: '#00B8D9' }, transition: 'color 0.2s' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              component={MuiLink}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener"
              sx={{ color: '#e3f2fd', '&:hover': { color: '#00B8D9' }, transition: 'color 0.2s' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
