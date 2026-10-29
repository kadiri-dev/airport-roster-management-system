import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError("Invalid login type or password.");
      return;
    }
    const destination = location.state?.from?.pathname || "/";
    navigate(destination, { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        p: 2,
        backgroundColor: "background.default",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 440 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Airport Roster Management
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Sign in to continue
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              select
              fullWidth
              label="Login type"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setPassword("");
                setError("");
              }}
              margin="normal"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="viewer">Viewer (read-only)</MenuItem>
            </TextField>
            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              margin="normal"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Sign in
            </Button>
          </Box>

          <Alert severity="info" sx={{ mt: 3 }}>
            Demo credentials — Admin: <strong>admin / admin123</strong>; Viewer:{" "}
            <strong>viewer / viewer123</strong>.
          </Alert>
          <Alert severity="warning" sx={{ mt: 2 }}>
            Demonstration login only. Do not use real or confidential officer
            data until authentication and permissions are secured on a backend.
          </Alert>
        </CardContent>
      </Card>
    </Box>
  );
}
