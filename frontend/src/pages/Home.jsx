"use client"
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
  Grid,
} from "@mui/material"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import PeopleIcon from "@mui/icons-material/People"
import ReceiptIcon from "@mui/icons-material/Receipt"
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy"
import MedicalServicesIcon from "@mui/icons-material/MedicalServices"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import posterImg from "../assets/Poster.jpg"

const features = [
  {
    title: "Patient Management",
    description: "Monitor and manage patient records, appointments, and treatments efficiently.",
    icon: <PeopleIcon fontSize="large" sx={{ color: "#333333" }} />,
  },
  {
    title: "Staff Management",
    description: "Efficiently manage hospital staff schedules, roles, and payroll operations.",
    icon: <LocalHospitalIcon fontSize="large" sx={{ color: "#333333" }} />,
  },
  {
    title: "Billing & Payments",
    description: "Streamline billing, insurance claims, and patient payments.",
    icon: <ReceiptIcon fontSize="large" sx={{ color: "#333333" }} />,
  },
  {
    title: "Pharmacy Management",
    description: "Track medications, inventory, and prescriptions effectively.",
    icon: <LocalPharmacyIcon fontSize="large" sx={{ color: "#333333" }} />,
  },
  {
    title: "Equipment Management",
    description: "Oversee medical equipment inventory, maintenance schedules, and allocation across departments.",
    icon: <MedicalServicesIcon fontSize="large" sx={{ color: "#333333" }} />,
  },
]

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  autoplay: true,
  autoplaySpeed: 6000,
  slidesToShow: 3,
  slidesToScroll: 1,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}

export default function Home() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        fontFamily: "'Inter', 'Roboto', sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffffff",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          minHeight: { xs: 500, md: 650, lg: 750 },
          py: { xs: 10, md: 18, lg: 20 },
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${posterImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Zoom in timeout={1000}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                letterSpacing: 1,
                mb: 3,
                textShadow: "0 4px 20px rgba(0,0,0,0.4)",
                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4.5rem" },
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
                textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                lineHeight: 1.5,
                maxWidth: "800px",
                mx: "auto",
                fontSize: { xs: "1.1rem", md: "1.3rem" },
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
                fontWeight: 600,
                borderRadius: 2,
                px: 5,
                py: 1.8,
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                fontSize: "1.1rem",
                textTransform: "none",
                bgcolor: "#ffffff",
                color: "#333333",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                },
                transition: "all 0.25s ease",
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
          backgroundColor: "#f5f5f5",
          py: { xs: 8, md: 12 },
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 700,
              color: "#333333",
              mb: 6,
              position: "relative",
              display: "inline-block",
              left: "50%",
              transform: "translateX(-50%)",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: "-12px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "4px",
                backgroundColor: "#333333",
                borderRadius: "2px",
              },
            }}
          >
            Key Features
          </Typography>
          <Slider {...sliderSettings}>
            {features.map((feature, index) => (
              <Box key={index} px={2}>
                <Fade in timeout={900 + index * 150}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 4, md: 5 },
                      minHeight: 300,
                      borderRadius: "12px",
                      textAlign: "center",
                      backgroundColor: "#ffffff",
                      border: "1px solid #f0f0f0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "default",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                        transform: "translateY(-8px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: "50%",
                        bgcolor: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 80,
                        height: 80,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: "#333333",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#666666", fontSize: "1rem" }}>
                      {feature.description}
                    </Typography>
                  </Paper>
                </Fade>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#ffffff" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {[
              { value: "10,000+", label: "Patients Served" },
              { value: "500+", label: "Medical Staff" },
              { value: "98%", label: "Patient Satisfaction" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 3,
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: "#333333",
                      mb: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#666666",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: "100%",
          background: "#333333",
          py: 4,
          mt: "auto",
          color: "#ffffff",
          fontWeight: 400,
          fontSize: "0.9rem",
          textAlign: "center",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
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
              sx={{
                color: "#ffffff",
                "&:hover": {
                  color: "#ffffff",
                  transform: "translateY(-3px)",
                },
                transition: "all 0.2s ease",
                mx: 0.5,
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="Twitter"
              component={MuiLink}
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              sx={{
                color: "#ffffff",
                "&:hover": {
                  color: "#ffffff",
                  transform: "translateY(-3px)",
                },
                transition: "all 0.2s ease",
                mx: 0.5,
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              component={MuiLink}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener"
              sx={{
                color: "#ffffff",
                "&:hover": {
                  color: "#ffffff",
                  transform: "translateY(-3px)",
                },
                transition: "all 0.2s ease",
                mx: 0.5,
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
