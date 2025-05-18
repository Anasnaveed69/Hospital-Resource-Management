import React, { useEffect } from 'react';
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
  useTheme,
  useMediaQuery,
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
import { keyframes } from '@mui/system';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 8px 32px rgba(0,184,217,0.13);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 12px 48px rgba(0,184,217,0.25);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 8px 32px rgba(0,184,217,0.13);
  }
`;

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
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        if (isVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      background: 'linear-gradient(180deg, #F4F7FA 0%, #E1F5FE 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          zIndex: 0,
          opacity: 0.4,
          pointerEvents: 'none',
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 184, 217, 0.1) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(54, 179, 126, 0.1) 0%, transparent 40%)
          `,
        }}
      />

      {/* Logout Button */}
      <Box sx={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            fontWeight: 700,
            borderRadius: 3,
            px: 3,
            py: 1.2,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            color: '#0052CC',
            boxShadow: '0 4px 16px rgba(0,82,204,0.1)',
            border: '1px solid rgba(0,184,217,0.2)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.95)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(0,82,204,0.15)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: { xs: '75vh', md: '90vh' },
          backgroundImage: `linear-gradient(135deg, 
            rgba(0, 82, 204, 0.85) 0%,
            rgba(0, 184, 217, 0.85) 50%,
            rgba(54, 179, 126, 0.85) 100%
          ), url(${posterImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: { xs: 2, md: 0 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
          },
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
          <Slide direction="down" in timeout={1200}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                letterSpacing: 2,
                mb: 3,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                textShadow: '0 8px 32px rgba(0,0,0,0.2)',
                background: 'linear-gradient(90deg, #fff 0%, #E1F5FE 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -16,
                  left: '25%',
                  width: '50%',
                  height: 4,
                  background: 'linear-gradient(90deg, transparent, #00B8D9, transparent)',
                  animation: `${shimmer} 3s infinite linear`,
                },
              }}
            >
              Welcome to MediCare
            </Typography>
          </Slide>

          <Fade in timeout={1800}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                mb: 6,
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                textShadow: '0 4px 16px rgba(0,0,0,0.15)',
                lineHeight: 1.6,
                color: '#E1F5FE',
                maxWidth: '800px',
                opacity: 0.9,
              }}
            >
              A Smart Hospital Resource Management System that enhances patient care and administrative efficiency through cutting-edge technology and intuitive design.
            </Typography>
          </Fade>

          <Fade in timeout={2400}>
            <Button
              variant="contained"
              size="large"
              sx={{
                fontWeight: 700,
                borderRadius: 8,
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                textTransform: 'none',
                background: 'linear-gradient(45deg, #00B8D9 0%, #36B37E 100%)',
                color: '#fff',
                boxShadow: '0 8px 32px rgba(0,184,217,0.25)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                  transform: 'translateX(-100%)',
                },
                '&:hover': {
                  transform: 'translateY(-5px) scale(1.02)',
                  boxShadow: '0 12px 48px rgba(0,184,217,0.35)',
                  '&::before': {
                    transform: 'translateX(100%)',
                    transition: 'transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
                  },
                },
              }}
            >
              Get Started
            </Button>
          </Fade>
        </Box>

        {/* Scroll Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: `${float} 2s infinite ease-in-out`,
            cursor: 'pointer',
            zIndex: 2,
          }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          <Typography
            sx={{
              color: '#E1F5FE',
              fontSize: '0.9rem',
              opacity: 0.8,
              mb: 1,
              textAlign: 'center',
            }}
          >
            Explore Features
          </Typography>
          <Box
            sx={{
              width: 30,
              height: 50,
              border: '2px solid #E1F5FE',
              borderRadius: 15,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 8,
                left: '50%',
                width: 6,
                height: 6,
                backgroundColor: '#E1F5FE',
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                animation: `${float} 1.5s infinite ease-in-out`,
              },
            }}
          />
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #F4F7FA 0%, #E1F5FE 100%)',
          py: { xs: 8, md: 12 },
          px: 2,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: `
              radial-gradient(circle at 0% 0%, rgba(0,184,217,0.1) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(54,179,126,0.1) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            className="animate-on-scroll"
            sx={{
              fontWeight: 900,
              color: '#0052CC',
              mb: 6,
              letterSpacing: 1,
              textShadow: '0 4px 24px rgba(0,82,204,0.15)',
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              '&.visible': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            }}
          >
            Key Features
          </Typography>

          <Slider {...sliderSettings}>
            {features.map((feature, index) => (
              <Box key={index} px={2}>
                <Paper
                  elevation={0}
                  className="animate-on-scroll"
                  sx={{
                    p: { xs: 4, md: 5 },
                    minHeight: 340,
                    borderRadius: 6,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0,184,217,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: 0,
                    transform: 'translateY(30px)',
                    '&.visible': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 60px rgba(0,184,217,0.15)',
                      border: '1px solid rgba(0,184,217,0.2)',
                      '& .feature-icon': {
                        animation: `${pulse} 2s infinite`,
                      },
                    },
                  }}
                >
                  <Box 
                    className="feature-icon"
                    sx={{ 
                      mb: 3,
                      p: 2,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(0,184,217,0.1) 0%, rgba(54,179,126,0.1) 100%)',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      color: '#0052CC',
                      letterSpacing: 0.5,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#222B45', 
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      opacity: 0.85,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: '100%',
          background: 'linear-gradient(90deg, #0052CC 0%, #00B8D9 100%)',
          py: 4,
          mt: 'auto',
          color: '#E1F5FE',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          },
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
          <Typography sx={{ fontWeight: 500, letterSpacing: 0.5 }}>
            © {new Date().getFullYear()} MediCare | All Rights Reserved
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {[
              { icon: <FacebookIcon />, url: 'https://facebook.com' },
              { icon: <TwitterIcon />, url: 'https://twitter.com' },
              { icon: <LinkedInIcon />, url: 'https://linkedin.com' },
            ].map((social, index) => (
              <IconButton
                key={index}
                aria-label={social.url.split('.com')[0].split('//')[1]}
                component={MuiLink}
                href={social.url}
                target="_blank"
                rel="noopener"
                sx={{
                  color: '#E1F5FE',
                  opacity: 0.8,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#fff',
                    opacity: 1,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
