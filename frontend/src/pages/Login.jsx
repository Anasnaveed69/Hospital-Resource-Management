"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
} from "@mui/material"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate a small delay for better UX
    setTimeout(() => {
      const validUsername = "admin"
      const validPassword = "hospital123"

      if (username === validUsername && password === validPassword) {
        console.log("Login successful, setting isAuthenticated to true")
        localStorage.setItem("isAuthenticated", "true")
        console.log("Navigating to /")
        navigate("/", { replace: true })
      } else {
        console.log("Login failed: Invalid credentials")
        setError("Invalid username or password")
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          bgcolor: "#ffffff",
        }}
      >
        <Box
          sx={{
            width: "100%",
            bgcolor: "#ffffff",
            color: "#333333",
            py: 4,
            textAlign: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1, color: "#333333" }}>
            Hospital Management
          </Typography>
          <Typography variant="body2" sx={{ color: "#666666" }}>
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
              fontWeight: "600",
              color: "#333333",
              fontSize: "1.1rem",
            }}
            sx={{ pb: 0, pt: 3, px: 3 }}
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
            <form onSubmit={handleLogin}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="username" shrink sx={{ color: "#555555", fontWeight: "500" }}>
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#e0e0e0" },
                      "&:hover fieldset": { borderColor: "#bdbdbd" },
                      "&.Mui-focused fieldset": { borderColor: "#757575" },
                    },
                  }}
                />
              </FormControl>

              <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <InputLabel htmlFor="password" shrink sx={{ color: "#555555", fontWeight: "500" }}>
                  Password
                </InputLabel>
                <Link href="#" underline="hover" sx={{ fontSize: "0.8rem", color: "#757575" }}>
                  Forgot password?
                </Link>
              </Box>
              <TextField
                id="password"
                type="password"
                placeholder="••••••••"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#e0e0e0" },
                    "&:hover fieldset": { borderColor: "#bdbdbd" },
                    "&.Mui-focused fieldset": { borderColor: "#757575" },
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
                  bgcolor: "#424242",
                  color: "#ffffff",
                  fontWeight: "500",
                  "&:hover": {
                    bgcolor: "#212121",
                  },
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  borderRadius: 1,
                }}
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
                fontWeight: "400",
              }}
            >
              Protected area. Unauthorized access is prohibited.
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  )
}

export default Login
