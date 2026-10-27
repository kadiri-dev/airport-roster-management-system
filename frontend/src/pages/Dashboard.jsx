import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from "@mui/material";

export default function Dashboard() {

  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>

          <Card>

            <CardContent>

              <Typography color="text.secondary">
                Total Officers
              </Typography>

              <Typography variant="h3">
                45
              </Typography>

            </CardContent>

          </Card>

        </Grid>


        <Grid item xs={12} md={4}>

          <Card>

            <CardContent>

              <Typography color="text.secondary">
                Current Roster
              </Typography>

              <Typography variant="h5">
                September 2026
              </Typography>

            </CardContent>

          </Card>

        </Grid>


        <Grid item xs={12} md={4}>

          <Card>

            <CardContent>

              <Typography color="text.secondary">
                Roster Status
              </Typography>

              <Typography variant="h5">
                Draft
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </Box>
  );
}
