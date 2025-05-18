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
import posterImg from "../assets/Home.jpg";

// --- Animated Blobs for Futuristic Background ---
function AnimatedBlobs() {
  return (
    <Box sx={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Box
        sx={{
          position: "absolute",
          width: 340,
          height: 340,
          top: "-80px",
          left: "-120px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
          opacity: 0.35,
          filter: "blur(48px)",
          animation: "blobMove1 12s ease-in-out infinite alternate",
          "@keyframes blobMove1": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "100%": { transform: "translate(40px, 60px) scale(1.15)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 260,
          height: 260,
          bottom: "-60px",
          right: "-80px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
          opacity: 0.32,
          filter: "blur(36px)",
          animation: "blobMove2 14s ease-in-out infinite alternate",
          "@keyframes blobMove2": {
            "0%": { transform: "translate(0, 0) scale(1)" },
            "100%": { transform: "translate(-30px, -40px) scale(1.12)" },
          },
        }}
      />
    </Box>
  );
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      const validUsername = "admin";
      const validPassword = "hospital123";

      if (username === validUsername && password === validPassword) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/home", { replace: true });
      } else {
        setError("Invalid username or password");
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
        backgroundImage: `url(${posterImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Futuristic Animated Blobs */}
      <AnimatedBlobs />

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
              Sign in to access your dashboard
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
              Management Login
            </Typography>

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
                <InputLabel htmlFor="username" shrink sx={{ color: "#1976D2", fontWeight: 600 }}>
                  Username
                </InputLabel>
                <TextField
                  id="username"
                  placeholder="Enter your username"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  margin="normal"
                  autoFocus
                  autoComplete="username"
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

              <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <InputLabel htmlFor="password" shrink sx={{ color: "#1976D2", fontWeight: 600 }}>
                  Password
                </InputLabel>
                <Link href="#" underline="hover" sx={{ fontSize: "0.8rem", color: "#1976D2" }}>
                  Forgot password?
                </Link>
              </Box>
              <TextField
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
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
                  boxShadow: "0 2px 8px 0 rgba(67,233,123,0.07)",
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  mt: 4,
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
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <Typography
              variant="caption"
              align="center"
              sx={{
                display: "block",
                mt: 3,
                color: "#9e9e9e",
                fontWeight: 400,
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
