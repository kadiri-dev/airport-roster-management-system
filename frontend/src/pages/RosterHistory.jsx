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
import { useAuth } from "../context/AuthContext";

export default function RosterHistory() {
  const [savedRosters, setSavedRosters] = useContext(rosterHistoryContext);
  const [selectedRoster, setSelectedRoster] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const handleDelete = () => {
    if (!isAdmin || !deleteTarget) return;

    setSavedRosters((previous) =>
      previous.filter((roster) => roster.id !== deleteTarget.id)
    );
    if (selectedRoster?.id === deleteTarget.id) setSelectedRoster(null);
    setDeleteTarget(null);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Roster History
      </Typography>
      <Typography mb={3}>
        {isAdmin
          ? "View previously submitted rosters or delete a saved roster."
          : "View previously submitted rosters. Viewer access is read-only."}
      </Typography>

      {savedRosters.length === 0 ? (
        <Paper sx={{ p: 3 }}>
          No saved rosters yet. An admin must submit a roster before it appears here.
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
                  <TableCell>{roster.month} {roster.year}</TableCell>
                  <TableCell>{roster.officers.length}</TableCell>
                  <TableCell>{new Date(roster.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Button variant="outlined" onClick={() => setSelectedRoster(roster)}>
                        View Roster
                      </Button>
                      {isAdmin && (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => setDeleteTarget(roster)}
                        >
                          Delete
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={Boolean(selectedRoster)}
        onClose={() => setSelectedRoster(null)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {selectedRoster ? `${selectedRoster.month} ${selectedRoster.year} Roster` : "Roster"}
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
                      <TableCell>{officer.NextBatch ?? officer.Batch ?? "-"}</TableCell>
                      <TableCell>{officer.NextRole || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedRoster(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(deleteTarget) && isAdmin} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Roster?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the{" "}
          <strong>{deleteTarget?.month} {deleteTarget?.year}</strong>{" "}
          roster? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
