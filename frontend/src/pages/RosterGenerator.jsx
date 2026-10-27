import { useContext, useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";

import { officerContext } from "../context/OfficerContext";
import { rosterContext } from "../context/RosterContext";

import {
  getCurrentYear,
  getCurrentMonth,
  assignBatch,
  setEligibleRoles,
  checkifRoleCompleted,
  isPROTenureDone,
  createRandomRole,
} from "../utils/rosterGenerator";

import {
  month,
  currentYear,
  currentMonth,
} from "../Data";
import { rosterHistoryContext } from "../context/RosterHistoryContext";

export default function RosterGenerator() {
  const [rosterArr, setRosterArr] = useContext(rosterContext);
  const [officers] = useContext(officerContext);
  const [showRoster, setShowRoster] = useState(false);
  const [, setSavedRosters] = useContext(rosterHistoryContext);
  
  const submitRoster = () => {
  if (!rosterArr.length) {
    alert("Please generate a roster before submitting.");
    return;
  }

  const rosterMonth = getCurrentMonth();
  const rosterYear = getCurrentYear();

  const savedRoster = {
    id: `${rosterYear}-${rosterMonth}-${Date.now()}`,
    month: rosterMonth,
    year: rosterYear,
    createdAt: new Date().toISOString(),

    // Save a snapshot, so later edits to the draft
    // do not alter the saved roster.
    officers: rosterArr.map((officer) => ({
      ...officer,
      Roles: officer.Roles
        ? JSON.parse(JSON.stringify(officer.Roles))
        : {},
      eligibleRoles: (officer.eligibleRoles ?? []).map(
        (role) => ({ ...role })
      ),
    })),
  };

  setSavedRosters((previous) => [
    savedRoster,
    ...previous,
  ]);

  alert("Roster saved successfully.");
};

  const createRoster = () => {
    // First determine each officer's proposed batch and mandatory role.
    const preparedOfficers = officers.map((officer) => {
      const nextBatch = assignBatch(officer);
      const currentRole =
        officer.Roles?.[getCurrentYear()]?.[getCurrentMonth()] ?? "";

      let generatedRole = null;

      if (officer.Cadre === "ACO") {
        if (
          currentRole === "PRO" &&
          !isPROTenureDone(officer)
        ) {
          generatedRole = "PRO";
        } else if (
          (currentRole === "DO" ||
            currentRole === "DETENTION OFFICER") &&
          !checkifRoleCompleted(officer, "DETENTION OFFICER")
        ) {
          generatedRole = "DO";
        }
      }

      return {
        ...officer,
        NextBatch: nextBatch,
        NextRole: generatedRole,
        eligibleRoles: [],
      };
    });

    // Allocate roles sequentially so each assignment affects capacity.
    const assignments = [];

    const newRosterArr = preparedOfficers.map((officer) => {
      const eligibleRoles = setEligibleRoles(
        officer,
        assignments
      );

      const nextRole =
        officer.NextRole ??
        createRandomRole(eligibleRoles);

      const updatedOfficer = {
        ...officer,
        NextRole: nextRole ?? "",
        eligibleRoles,
      };

      assignments.push({
        officerId: officer.id,
        Batch: officer.NextBatch,
        Role: updatedOfficer.NextRole,
      });

      return updatedOfficer;
    });

    // Refresh eligibility after all roles have been allocated.
    const finalRoster = newRosterArr.map((officer) => ({
      ...officer,
      eligibleRoles: setEligibleRoles(officer, assignments),
    }));

    setRosterArr(finalRoster);
    setShowRoster(true);
  };

  const discardRoster = () => {
    setRosterArr([]);
    setShowRoster(false);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Create New Roster
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <Button variant="contained" onClick={createRoster}>
          Generate Roster
        </Button>

        {showRoster && (
          <Button variant="outlined" onClick={discardRoster}>
            Discard Generated Roster
          </Button>
        )}

        {showRoster && (
          <Button
            variant="contained"
            color="success"
            onClick={submitRoster}
          >
            Submit Roster
        </Button>
        )}
      </Box>

      <Typography variant="h5" fontWeight="bold" mb={3} sx={{ ml: 1, mt: 1 }}>
        Roster Month: {month[currentMonth]}
      </Typography>

      {showRoster && <CreateTabs rosterArr={rosterArr} />}
    </Box>
  );
}

function splitBatches(rosterArr, batch = null) {
  if (batch === null) return rosterArr;

  return rosterArr.filter(
    (officer) => officer.NextBatch === batch
  );
}

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`roster-tabpanel-${index}`}
      aria-labelledby={`roster-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `roster-tab-${index}`,
    "aria-controls": `roster-tabpanel-${index}`,
  };
}

function CreateTabs({ rosterArr }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const batches = [null, "A", "B", "C", "D"];
  const labels = [
    "ALL OFFICERS",
    "BATCH A",
    "BATCH B",
    "BATCH C",
    "BATCH D",
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Roster batch tabs"
        >
          {labels.map((label, index) => (
            <Tab key={label} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      {batches.map((batch, index) => (
        <CustomTabPanel
          key={batch ?? "all"}
          value={value}
          index={index}
        >
          <BuildTable rosterArr={splitBatches(rosterArr, batch)} />
        </CustomTabPanel>
      ))}
    </Box>
  );
}

CreateTabs.propTypes = {
  rosterArr: PropTypes.array.isRequired,
};

function BuildTable({ rosterArr }) {
  const [, setRosterArr] = useContext(rosterContext);

  const updateOfficerBatch = (id, newBatch) => {
    setRosterArr((currentRoster) =>
      currentRoster.map((officer) =>
        officer.id === id
          ? { ...officer, NextBatch: newBatch }
          : officer
      )
    );
  };

  const updateOfficerRole = (id, newRole) => {
    setRosterArr((currentRoster) =>
      currentRoster.map((officer) =>
        officer.id === id
          ? { ...officer, NextRole: newRole }
          : officer
      )
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Roster table">
        <TableHead>
          <TableRow>
            <TableCell>Serial Number</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Cadre</TableCell>
            <TableCell>Current Batch</TableCell>
            <TableCell>Next Batch</TableCell>
            <TableCell>Current Role</TableCell>
            <TableCell>Next Role</TableCell>
            <TableCell>Roles Eligible</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rosterArr.map((officer, index) => (
            <TableRow
              key={officer.id}
              sx={{ "&:hover": { backgroundColor: "action.hover" } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{officer.Name}</TableCell>
              <TableCell>{officer.Cadre}</TableCell>
              <TableCell>{officer.Batch}</TableCell>

              <TableCell>
                <CreateBatchOptions
                  NextBatch={officer.NextBatch}
                  onBatchChange={(newBatch) =>
                    updateOfficerBatch(officer.id, newBatch)
                  }
                />
              </TableCell>

              <TableCell>
                {officer.Roles?.[currentYear]?.[month[currentMonth]] ?? "-"}
              </TableCell>

              <TableCell>{officer.NextRole || "-"}</TableCell>

              <TableCell>
                <CreateRoleOptions
                  roles={officer.eligibleRoles ?? []}
                  selectedRole={officer.NextRole ?? ""}
                  onRoleChange={(newRole) =>
                    updateOfficerRole(officer.id, newRole)
                  }
                />
              </TableCell>
            </TableRow>
          ))}

          {rosterArr.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No officers in this batch.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

BuildTable.propTypes = {
  rosterArr: PropTypes.array.isRequired,
};

function CreateRoleOptions({ roles, selectedRole, onRoleChange }) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="role-select-label">Select Role</InputLabel>

      <Select
        labelId="role-select-label"
        value={selectedRole}
        label="Select Role"
        onChange={(event) => onRoleChange(event.target.value)}
      >
        {roles.map((roleObj) => {
          const disabled = roleObj.batchFull;

          return (
            <MenuItem
              key={roleObj.role}
              value={roleObj.role}
              disabled={disabled}
              sx={{
                color: disabled ? "red" : "inherit",
                backgroundColor: disabled ? "#ffebee" : "transparent",
              }}
            >
              {roleObj.role}
              {roleObj.completed
                ? " (Completed)"
                : roleObj.batchFull
                  ? " (Batch Full)"
                  : ""}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

CreateRoleOptions.propTypes = {
  roles: PropTypes.array.isRequired,
  selectedRole: PropTypes.string,
  onRoleChange: PropTypes.func.isRequired,
};

function CreateBatchOptions({ NextBatch, onBatchChange }) {
  const batches = ["A", "B", "C", "D"];

  return (
    <FormControl fullWidth size="small">
      <Select
        value={NextBatch ?? ""}
        onChange={(event) => onBatchChange(event.target.value)}
        inputProps={{ "aria-label": "Next batch" }}
      >
        {batches.map((batch) => (
          <MenuItem key={batch} value={batch}>
            {batch}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

CreateBatchOptions.propTypes = {
  NextBatch: PropTypes.string,
  onBatchChange: PropTypes.func.isRequired,
};