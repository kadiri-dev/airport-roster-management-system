import { AppBar, Toolbar, Typography, Box, Button, Chip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 1300 }}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
          Airport Roster Management System
        </Typography>
        {user && (
          <>
            <Chip
              size="small"
              label={`${user.username} · ${user.role === "admin" ? "Admin" : "Viewer"}`}
              sx={{ color: "white", borderColor: "rgba(255,255,255,.6)" }}
              variant="outlined"
            />
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
