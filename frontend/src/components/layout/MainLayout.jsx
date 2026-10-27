import { Box, Toolbar } from "@mui/material";

import Sidebar from "./Sidebar";
import Header from "./Header";


export default function MainLayout({ children }) {

  return (

    <Box
      sx={{
        display: "flex"
      }}
    >

      <Header />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4
        }}
      >

        <Toolbar />

        {children}

      </Box>

    </Box>

  );

}