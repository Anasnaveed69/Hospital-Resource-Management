import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Fade,
  InputAdornment,
  IconButton,
  CircularProgress,
  InputLabel,
  FormControl,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// --- Animated Blobs for Futuristic Background ---
function AnimatedBlobs() {
  return (
    <Box sx={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Box
        sx={{
          position: "absolute",
          width: 480,
          height: 480,
          top: "-120px",
          left: "-160px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
          opacity: 0.35,
          filter: "blur(80px)",
          animation: "blobMove1 12s ease-in-out infinite alternate",
          "@keyframes blobMove1": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "100%": { transform: "translate(60px, 80px) scale(1.15)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 380,
          height: 380,
          bottom: "-100px",
          right: "-120px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
          opacity: 0.32,
          filter: "blur(60px)",
          animation: "blobMove2 14s ease-in-out infinite alternate",
          "@keyframes blobMove2": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "100%": { transform: "translate(-50px, -60px) scale(1.12)" },
          },
        }}
      />
    </Box>
  );
}

// --- Floating Medical Crosses ---
function FloatingCrosses() {
  const crosses = [
    { top: "15%", left: "8%", size: 28, delay: "0s", duration: "18s" },
    { top: "25%", right: "12%", size: 36, delay: "2s", duration: "22s" },
    { bottom: "18%", left: "15%", size: 24, delay: "4s", duration: "16s" },
    { bottom: "28%", right: "10%", size: 32, delay: "1s", duration: "20s" },
    { top: "55%", left: "85%", size: 30, delay: "3s", duration: "19s" },
  ];

  return (
    <Box sx={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      {crosses.map((c, idx) => (
        <Box
          key={idx}
          sx={{
            position: "absolute",
            top: c.top,
            left: c.left,
            right: c.right,
            width: c.size,
            height: c.size,
            opacity: 0.08,
            color: "#1976D2",
            animation: `floatCross ${c.duration} ease-in-out infinite alternate`,
            animationDelay: c.delay,
            "@keyframes floatCross": {
              "0%": {
                transform: "translateY(0) rotate(0deg) scale(1)",
                opacity: 0.05,
              },
              "50%": {
                opacity: 0.12,
              },
              "100%": {
                transform: "translateY(-40px) rotate(180deg) scale(1.1)",
                opacity: 0.05,
              },
            },
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
            <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
          </svg>
        </Box>
      ))}
    </Box>
  );
}

// --- Glowing Hospital ECG (Heartbeat) Wave ---
function ECGBackground() {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "65%",
        height: 180,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.18,
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ecg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3a7bd5" stopOpacity={0} />
            <stop offset="15%" stopColor="#00d2ff" stopOpacity={1} />
            <stop offset="50%" stopColor="#1976D2" stopOpacity={1} />
            <stop offset="85%" stopColor="#00d2ff" stopOpacity={1} />
            <stop offset="100%" stopColor="#3a7bd5" stopOpacity={0} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 0 50 L 150 50 Q 160 42 170 50 L 190 50 L 200 55 L 210 12 L 225 88 L 235 50 Q 250 38 265 50 L 650 50 Q 660 42 670 50 L 690 50 L 700 55 L 710 12 L 725 88 L 735 50 Q 750 38 765 50 L 1000 50"
          fill="none"
          stroke="url(#ecg-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          style={{
            strokeDasharray: "2000",
            strokeDashoffset: "2000",
            animation: "ecgFlow 12s linear infinite",
          }}
        />
      </svg>
      <style>
        {`
          @keyframes ecgFlow {
            0% {
              stroke-dashoffset: 2000;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </Box>
  );
}

export default function Login() {
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  // Animate form fade-in
  useState(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const validPasscode = "hospital123";

      if (passcode === validPasscode) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/home", { replace: true });
      } else {
        setError("Invalid security passcode");
      }
      setIsLoading(false);
    }, 900);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #e8eaf6 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(58, 123, 213, 0.08) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
          zIndex: 1,
        }
      }}
    >
      {/* Futuristic Animated Blobs */}
      <AnimatedBlobs />

      {/* Hospital/Medical Animations */}
      <FloatingCrosses />
      <ECGBackground />

      {/* Glassmorphism Login Card */}
      <Fade in={fadeIn} timeout={1200}>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 410,
            px: { xs: 2, sm: 4 },
            py: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 4,
            backdropFilter: "blur(16px) saturate(180%)",
            background: "rgba(255,255,255,0.22)",
            boxShadow:
              "0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 0 0 1.5px rgba(58,123,213,0.18)",
            border: "1.5px solid rgba(255,255,255,0.25)",
            position: "relative",
            zIndex: 2,
            overflow: "hidden",
            animation: "popIn 1.1s cubic-bezier(.23,1.05,.32,1) both",
            "@keyframes popIn": {
              "0%": { opacity: 0, transform: "scale(0.95) translateY(30px)" },
              "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
            },
          }}
        >
          {/* Glowing border effect */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: 4,
              pointerEvents: "none",
              boxShadow:
                "0 0 32px 0 #00d2ff66, 0 0 16px 0 #43e97b44",
              zIndex: 1,
            }}
          />

          {/* Title */}
          <Box
            sx={{
              width: "100%",
              bgcolor: "rgb(58, 141, 213)",
              color: "#fff",
              py: 3,
              textAlign: "center",
              borderRadius: "20px 20px 0 0",
              mb: 1,
              boxShadow: "0 2px 12px 0 rgba(58,123,213,0.12)",
              zIndex: 2,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: 1 }}>
              MediCare
            </Typography>
            <Typography variant="body2" sx={{ color: "#e3f2fd", mt: 0.5 }}>
              Enter passcode to access dashboard
            </Typography>
          </Box>

          <Box sx={{ width: "100%", mt: 2, zIndex: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#1976D2",
                fontSize: "1.15rem",
                letterSpacing: 0.5,
                textAlign: "center",
                mb: 2,
              }}
            >
              Administrative Access
            </Typography>

            {/* Business Specific Private Portal Notice */}
            <Alert
              severity="warning"
              sx={{
                mb: 3,
                bgcolor: "rgba(255, 152, 0, 0.08)",
                color: "#b26a00",
                border: "1px solid rgba(255, 152, 0, 0.25)",
                "& .MuiAlert-icon": { color: "#b26a00" },
                fontSize: "0.85rem",
                lineHeight: 1.4,
                textAlign: "left",
              }}
            >
              <strong>Private System:</strong> This is a business-specific resource management portal. Public registration is not available. Access is restricted to pre-authorized administrators.
            </Alert>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  bgcolor: "#fff5f5",
                  color: "#e53935",
                  "& .MuiAlert-icon": { color: "#e53935" },
                  border: "1px solid #ffcdd2",
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin} autoComplete="off">
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="passcode" shrink sx={{ color: "#1976D2", fontWeight: 600 }}>
                  Security Access Passcode
                </InputLabel>
                <TextField
                  id="passcode"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter access passcode"
                  variant="outlined"
                  fullWidth
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                  margin="normal"
                  autoFocus
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? "Hide passcode" : "Show passcode"}
                          onClick={() => setShowPassword((show) => !show)}
                          edge="end"
                          size="small"
                          sx={{
                            color: "#1976D2",
                            transition: "color .2s",
                            "&:hover": { color: "#00d2ff" },
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.85)",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#00d2ff" },
                      "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                    },
                    transition: "box-shadow .2s",
                    boxShadow: "0 2px 8px 0 rgba(0,210,255,0.07)",
                  }}
                />
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  borderRadius: 2.5,
                  letterSpacing: 0.5,
                  textTransform: "none",
                  background: "linear-gradient(90deg,rgb(0, 191, 255) 0%,rgb(58, 58, 213) 100%)",
                  color: "#fff",
                  boxShadow: "0 4px 24px 0 #00d2ff33",
                  transition: "all 0.25s cubic-bezier(.25,.8,.25,1)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                    boxShadow: "0 6px 32px 0 #43e97b44",
                    color: "#fff",
                    transform: "scale(1.03)",
                  },
                  "& .MuiTouchRipple-root": {
                    color: "#00d2ff",
                  },
                }}
                endIcon={isLoading && <CircularProgress size={22} color="inherit" />}
              >
                {isLoading ? "Verifying..." : "Verify Passcode"}
              </Button>
            </form>
            <Typography
              variant="caption"
              align="center"
              sx={{
                display: "block",
                mt: 3,
                color: "#1e293b",
                fontWeight: 600,
                zIndex: 2,
              }}
            >
              Protected area. Unauthorized access is prohibited.
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
}
