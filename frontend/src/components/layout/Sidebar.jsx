import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";

import { useNavigate } from "react-router-dom";


const drawerWidth = 240;


export default function Sidebar() {

  const navigate = useNavigate();


  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/"
    },

    {
      text: "Officers",
      icon: <PeopleIcon />,
      path: "/officers"
    },

    {
      text: "Create Roster",
      icon: <CalendarMonthIcon />,
      path: "/roster"
    },

    {
      text: "Roster History",
      icon: <HistoryIcon />,
      path: "/history"
    },

    {
      text: "Settings",
      icon: <SettingsIcon />,
      path: "/settings"
    }

  ];


  return (

    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box"
        }
      }}
    >

      <Toolbar />

      <List>

        {menuItems.map((item) => (

          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
          >

            <ListItemIcon>

              {item.icon}

            </ListItemIcon>

            <ListItemText
              primary={item.text}
            />

          </ListItemButton>

        ))}

      </List>

    </Drawer>

  );

}