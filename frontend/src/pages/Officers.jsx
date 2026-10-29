import { Box, Typography } from "@mui/material";
import {OfficerHistory} from "../components/officers/OfficersHistory";  

export default function Officers() {
  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
      >
        Officers
      </Typography>
      <Typography mt={2}>
        Manage officers and view their roster history.
      </Typography>
      <OfficerHistory />
    </Box>
  );
}
