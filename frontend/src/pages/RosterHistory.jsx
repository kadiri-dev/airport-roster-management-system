
import { useContext, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { rosterHistoryContext } from "../context/RosterHistoryContext";

export default function RosterHistory() {
  const [savedRosters, setSavedRosters] =
    useContext(rosterHistoryContext);

  const [selectedRoster, setSelectedRoster] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = () => {
    if (!deleteTarget) return;

    setSavedRosters((previous) =>
      previous.filter((roster) => roster.id !== deleteTarget.id)
    );

    // Close the roster viewer too, if that roster was open.
    if (selectedRoster?.id === deleteTarget.id) {
      setSelectedRoster(null);
    }

    setDeleteTarget(null);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Roster History
      </Typography>

      <Typography mb={3}>
        View previously submitted rosters or delete a saved roster.
      </Typography>

      {savedRosters.length === 0 ? (
        <Paper sx={{ p: 3 }}>
          No saved rosters yet. Generate and submit a roster
          from the Create Roster page.
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roster Month</TableCell>
                <TableCell>Officers</TableCell>
                <TableCell>Submitted On</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {savedRosters.map((roster) => (
                <TableRow key={roster.id}>
                  <TableCell>
                    {roster.month} {roster.year}
                  </TableCell>

                  <TableCell>
                    {roster.officers.length}
                  </TableCell>

                  <TableCell>
                    {new Date(roster.createdAt).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Button
                        variant="outlined"
                        onClick={() => setSelectedRoster(roster)}
                      >
                        View Roster
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setDeleteTarget(roster)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* View saved roster */}
      <Dialog
        open={Boolean(selectedRoster)}
        onClose={() => setSelectedRoster(null)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {selectedRoster
            ? `${selectedRoster.month} ${selectedRoster.year} Roster`
            : "Roster"}
        </DialogTitle>

        <DialogContent>
          {selectedRoster && (
            <TableContainer component={Paper} sx={{ mt: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Cadre</TableCell>
                    <TableCell>Batch</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {selectedRoster.officers.map((officer, index) => (
                    <TableRow key={officer.id ?? index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{officer.Name}</TableCell>
                      <TableCell>{officer.Cadre}</TableCell>
                      <TableCell>
                        {officer.NextBatch ?? officer.Batch ?? "-"}
                      </TableCell>
                      <TableCell>
                        {officer.NextRole || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSelectedRoster(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm deletion */}
      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
      >
        <DialogTitle>Delete Roster?</DialogTitle>

        <DialogContent>
          Are you sure you want to delete the{" "}
          <strong>
            {deleteTarget?.month} {deleteTarget?.year}
          </strong>{" "}
          roster? This action cannot be undone.
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
