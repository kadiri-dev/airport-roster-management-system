import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import { AddOfficers } from "./ModifyOfficers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { officerContext } from "../../context/OfficerContext";
import { useAuth } from "../../context/AuthContext";

export function OfficerHistory() {
  const [txt, setTxt] = useState("");
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [editState, setEditState] = useState(false);
  const [officers, setOfficers] = useContext(officerContext);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const officerData =
    txt !== ""
      ? officers.filter((officer) =>
          Object.values(officer).some((value) =>
            String(value).toLowerCase().includes(txt.toLowerCase())
          )
        )
      : officers;

  const handleSubmit = () => {
    if (!isAdmin || id == null) return;
    setOfficers((previous) => previous.filter((officer) => officer.id !== id));
    setOpen(false);
    setId(null);
  };

  const handleDelete = (officerId) => {
    if (!isAdmin) return;
    setOpen(true);
    setId(officerId);
  };

  const handleClose = () => {
    setOpen(false);
    setId(null);
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center", flexWrap: "wrap" }}
      >
        <TextField
          id="officer-search"
          value={txt}
          placeholder="Search officer..."
          label="Search officers"
          onChange={(event) => setTxt(event.target.value)}
        />
        {isAdmin && (
          <AddOfficers
            editState={editState}
            setEditState={setEditState}
            id={id}
          />
        )}
        {!isAdmin && (
          <Typography color="text.secondary" variant="body2">
            Viewer access — officer records are read-only.
          </Typography>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="officers table">
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>DOJ</TableCell>
              <TableCell>Gov Mail</TableCell>
              <TableCell>Cadre</TableCell>
              {isAdmin && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {officerData.map((officer, index) => (
              <TableRow
                key={officer.id}
                sx={{ "&:hover": { backgroundColor: "action.hover" } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{officer.Name}</TableCell>
                <TableCell>{officer.DOB}</TableCell>
                <TableCell>{officer.DOJ}</TableCell>
                <TableCell>{officer.GovMail}</TableCell>
                <TableCell>{officer.Cadre}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        onClick={() => {
                          setEditState(true);
                          setId(officer.id);
                        }}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(officer.id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {officerData.length === 0 && (
              <TableRow>
                <TableCell colSpan={isAdmin ? 7 : 6} align="center">
                  No officers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open && isAdmin} onClose={handleClose}>
        <DialogTitle>Delete Officer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this officer? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" type="button" onClick={handleSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
