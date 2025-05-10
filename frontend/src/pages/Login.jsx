import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
  CardHeader,
  Link,
  InputLabel,
  FormControl,
  Paper,
  Fade,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import posterImg from '../assets/Poster.jpg';
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
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(120deg, #e3f2fd 60%, #b2dfdb 100%)",
        padding: 2,
      }}
    >
      <Fade in={fadeIn} timeout={900}>
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 420,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(25,118,210,0.13)",
            bgcolor: "#ffffff",
            transition: "box-shadow 0.3s cubic-bezier(.4,2,.6,1)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              bgcolor: "#1976D2",
              color: "#fff",
              py: 4,
              textAlign: "center",
              borderBottom: "1px solid #e3f2fd",
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 900, mb: 1, letterSpacing: 1 }}>
              MediCare
            </Typography>
            <Typography variant="body2" sx={{ color: "#e3f2fd" }}>
              Sign in to access your dashboard
            </Typography>
          </Box>

          <Card
            sx={{
              width: "100%",
              borderRadius: 0,
              boxShadow: "none",
              bgcolor: "#ffffff",
            }}
          >
            <CardHeader
              title="Management Login"
              titleTypographyProps={{
                variant: "h6",
                fontWeight: 700,
                color: "#1976D2",
                fontSize: "1.15rem",
                letterSpacing: 0.5,
              }}
              sx={{ pb: 0, pt: 3, px: 3, textAlign: "center" }}
            />
            <CardContent sx={{ pt: 2, px: 3, pb: 4 }}>
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
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#e0e0e0" },
                        "&:hover fieldset": { borderColor: "#bdbdbd" },
                        "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                      },
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
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#bdbdbd" },
                      "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                    },
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
                    bgcolor: "#1976D2",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    borderRadius: 2,
                    boxShadow: "0 4px 16px rgba(25,118,210,0.15)",
                    letterSpacing: 0.5,
                    textTransform: "none",
                    transition: "all 0.25s cubic-bezier(.25,.8,.25,1)",
                    "&:hover": {
                      bgcolor: "#1565c0",
                      boxShadow: "0 6px 24px rgba(25,118,210,0.22)",
                      transform: "scale(1.03)",
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
                }}
              >
                Protected area. Unauthorized access is prohibited.
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Fade>
    </Box>
  );
}
