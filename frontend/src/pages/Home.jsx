import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  useTheme,
  IconButton,
  Link as MuiLink,
  Fade,
  Zoom,
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
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import posterImg from '../assets/Poster.jpg';

const features = [
  {
    title: 'Patient Management',
    description: 'Monitor and manage patient records, appointments, and treatments efficiently.',
    icon: <PeopleIcon fontSize="large" sx={{ color: '#1976D2' }} />,
  },
  {
    title: 'Staff Management',
    description: 'Efficiently manage hospital staff schedules, roles, and payroll operations.',
    icon: <LocalHospitalIcon fontSize="large" sx={{ color: '#43a047' }} />,
  },
  {
    title: 'Billing & Payments',
    description: 'Streamline billing, insurance claims, and patient payments.',
    icon: <ReceiptIcon fontSize="large" sx={{ color: '#1976D2' }} />,
  },
  {
    title: 'Pharmacy Management',
    description: 'Track medications, inventory, and prescriptions effectively.',
    icon: <LocalPharmacyIcon fontSize="large" sx={{ color: '#43a047' }} />,
  },
  {
    title: 'Equipment Management',
    description: 'Oversee medical equipment inventory, maintenance schedules, and allocation across departments.',
    icon: <MedicalServicesIcon fontSize="large" sx={{ color: '#1976D2' }} />,
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  autoplay: true,
  autoplaySpeed: 6000,
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
  const theme = useTheme();

  return (
    <Box sx={{ fontFamily: "'Inter', 'Roboto', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          flexGrow: 1,
          minHeight: { xs: 400, md: 600, lg: 720 },
          py: { xs: 10, md: 18, lg: 20 },
          backgroundImage: `linear-gradient(rgba(25, 118, 210, 0.65), rgba(67, 160, 71, 0.3)), url(${posterImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Zoom in timeout={1000}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                letterSpacing: 2,
                mb: 3,
                textShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              Welcome to MediCare
            </Typography>
          </Zoom>
          <Fade in timeout={1500}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                mb: 5,
                textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                lineHeight: 1.5,
              }}
            >
              A Smart Hospital Resource Management System that enhances patient care and administrative efficiency.
            </Typography>
          </Fade>
          <Fade in timeout={2000}>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{
                fontWeight: 700,
                borderRadius: 8,
                px: 5,
                py: 1.8,
                boxShadow: '0 4px 16px rgba(67,160,71,0.3)',
                fontSize: '1.2rem',
                textTransform: 'none',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(67,160,71,0.45)',
                  transform: 'scale(1.04)',
                },
                transition: 'all 0.25s cubic-bezier(.25,.8,.25,1)',
              }}
            >
              Get Started
            </Button>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.light,
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
              color: '#fff',
              mb: 4,
              letterSpacing: 1,
              textShadow: '0 3px 20px rgba(25,118,210,0.3)',
            }}
          >
            Key Features
          </Typography>
          <Slider {...sliderSettings}>
            {features.map((feature, index) => (
              <Box key={index} px={2}>
                <Fade in timeout={900 + index * 150}>
                  <Paper
                    elevation={6}
                    sx={{
                      p: { xs: 4, md: 5 },
                      minHeight: 320,
                      borderRadius: '24px',
                      textAlign: 'center',
                      backgroundColor: '#f9fafb',
                      border: '1px solid #e0e0e0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'default',
                      transition: 'all 0.35s cubic-bezier(.25,.8,.25,1)',
                      '&:hover': {
                        boxShadow: '0 12px 40px rgba(25,118,210,0.15)',
                        transform: 'translateY(-10px) scale(1.05)',
                      },
                    }}
                  >
                    <Box sx={{ mb: 3 }}>{feature.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        mb: 2,
                        color: '#1976D2',
                        letterSpacing: 0.3,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#263238', fontSize: '1.1rem' }}>
                      {feature.description}
                    </Typography>
                  </Paper>
                </Fade>
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
          background: 'linear-gradient(90deg, #1976D2 70%, #43a047 100%)',
          py: 4,
          mt: 'auto',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          color: '#e3f2fd',
          fontWeight: 400,
          fontSize: '0.9rem',
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
          }}
        >
          <Typography>
            © {new Date().getFullYear()} MediCare Hospital Resource Management | All Rights Reserved
          </Typography>
          <Box>
            <IconButton
              aria-label="Facebook"
              component={MuiLink}
              href="https://facebook.com"
              target="_blank"
              rel="noopener"
              sx={{ color: '#e3f2fd', '&:hover': { color: '#1976D2' } }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="Twitter"
              component={MuiLink}
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              sx={{ color: '#e3f2fd', '&:hover': { color: '#1976D2' } }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              component={MuiLink}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener"
              sx={{ color: '#e3f2fd', '&:hover': { color: '#1976D2' } }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
