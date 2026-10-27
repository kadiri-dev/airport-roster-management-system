import {
  AcoRoles,
  AcsRoles,
  month,
  currentYear,
  previousYear,
  currentMonth,
} from "../Data";

// --------------------------------------------------
// Current and next month helpers
// --------------------------------------------------

export const getCurrentYear = () => currentYear;

export const getCurrentMonth = () => month[currentMonth];

// Move backward: B -> A, A -> D, D -> C, C -> B
export const assignBatch = (officer) => {
  const batch = officer?.Batch;

  const previousBatch = {
    A: "D",
    B: "A",
    C: "B",
    D: "C",
  };

  return previousBatch[batch] ?? batch ?? "A";
};

// --------------------------------------------------
// Read role history safely
// --------------------------------------------------

const getRolesForYear = (officer, year) =>
  officer?.Roles?.[year] ?? {};

const getRoleForMonth = (officer, year, monthName) =>
  getRolesForYear(officer, year)[monthName] ?? "";

const normaliseRole = (role) =>
  String(role ?? "").trim().toUpperCase().replace(/\s+/g, " ");

const roleAliases = {
  "VALUATION OF DETENTION GOODS": [
    "VALUATION OF DETENTION GOODS",
    "VDX",
  ],
  "DEP BOND, VDX, CARNET": [
    "DEP BOND, VDX, CARNET",
    "DEP, OIL FUELING & DEP BOND/CARNET",
  ],
  "BOND/FUEL (+)/CARNET": [
    "BOND/FUEL (+)/CARNET",
    "DEP, OIL FUELING & DEP BOND/CARNET",
  ],
  "S.D.O": ["S.D.O", "SDO"],
  DO: ["DO", "DETENTION OFFICER"],
  "DETENTION OFFICER": ["DO", "DETENTION OFFICER"],
};

const getRoleNames = (role) =>
  (roleAliases[normaliseRole(role)] ?? [role]).map(normaliseRole);

const countRoleHistory = (officer, role) => {
  const names = getRoleNames(role);

  return [previousYear, currentYear].reduce((total, year) => {
    const roles = getRolesForYear(officer, year);

    return (
      total +
      Object.values(roles).filter((assignedRole) =>
        names.includes(normaliseRole(assignedRole))
      ).length
    );
  }, 0);
};

// --------------------------------------------------
// PRO restriction
// --------------------------------------------------

export const isPROTenureDone = (officer) => {
  const nextMonthIndex = (currentMonth + 1) % 12;
  const yearToCheck =
    currentMonth === 11 ? currentYear + 1 : currentYear;

  const role = getRoleForMonth(
    officer,
    yearToCheck,
    month[nextMonthIndex]
  );

  return normaliseRole(role) === "PRO";
};

// --------------------------------------------------
// Role completion
// --------------------------------------------------

export const checkifRoleCompleted = (officer, role = "all") => {
  const roleName = normaliseRole(role);

  if (
    roleName === "DO" ||
    roleName === "DETENTION OFFICER"
  ) {
    return countRoleHistory(officer, "DO") >= 3;
  }

  if (roleName === "S.D.O" || roleName === "SDO") {
    return countRoleHistory(officer, role) >= 1;
  }

  if (roleName === "PRO") {
    return (
      countRoleHistory(officer, "PRO") >= 12 ||
      isPROTenureDone(officer)
    );
  }

  return countRoleHistory(officer, role) >= 1;
};

// --------------------------------------------------
// Current and next month roles
// --------------------------------------------------

export const getOfficerCurrentRole = (officer) =>
  getRoleForMonth(officer, currentYear, month[currentMonth]);

export const getOfficerNextMonthRole = (officer) => {
  const nextMonthIndex = (currentMonth + 1) % 12;
  const nextYear =
    currentMonth === 11 ? currentYear + 1 : currentYear;

  return getRoleForMonth(
    officer,
    nextYear,
    month[nextMonthIndex]
  );
};

// --------------------------------------------------
// Batch capacity
// --------------------------------------------------

const getRoleCapacity = (role) => {
  const matchingKey = Object.keys(AcoRoles).find(
    (key) => normaliseRole(key) === normaliseRole(role)
  );

  if (!matchingKey) return Infinity;

  return Number(AcoRoles[matchingKey]);
};

const countAssignedInBatch = (
  role,
  batch,
  assignments = [],
  officerId
) => {
  const roleNames = getRoleNames(role);

  return assignments.filter((assignment) => {
    const assignmentRole = assignment.Role ?? assignment.NextRole;
    const assignmentBatch = assignment.Batch ?? assignment.NextBatch;

    const sameOfficer =
      officerId != null &&
      assignment.officerId != null &&
      String(assignment.officerId) === String(officerId);

    return (
      !sameOfficer &&
      assignmentBatch === batch &&
      roleNames.includes(normaliseRole(assignmentRole))
    );
  }).length;
};

const isBatchRoleFull = (
  role,
  batch,
  assignments = [],
  officerId
) => {
  const capacity = getRoleCapacity(role);

  if (!Number.isFinite(capacity)) return false;

  return (
    countAssignedInBatch(role, batch, assignments, officerId) >=
    capacity
  );
};

// --------------------------------------------------
// Eligible roles
// --------------------------------------------------

export const setEligibleRoles = (officer, assignments = []) => {
  if (!officer?.Cadre) return [];

  let roleDefinitions;

  switch (officer.Cadre) {
    case "ACO":
      roleDefinitions = AcoRoles;
      break;

    case "ACS":
      roleDefinitions = AcsRoles;
      break;

    case "AC/DC":
      return [
        {
          role: "SUPERVISION",
          completed: false,
          batchFull: false,
        },
      ];

    default:
      return [];
  }

  const batch = officer.NextBatch ?? officer.Batch;

  return Object.keys(roleDefinitions).map((role) => {
    const completed =
      officer.Cadre === "ACO"
        ? checkifRoleCompleted(officer, role)
        : false;

    const batchFull =
      officer.Cadre === "ACO" &&
      isBatchRoleFull(role, batch, assignments, officer.id);

    return {
      role,
      completed,
      batchFull,
    };
  });
};

// --------------------------------------------------
// Random role allocation
// --------------------------------------------------

export const createRandomRole = (eligibleRoles = []) => {
  const availableRoles = eligibleRoles.filter(
    (item) => !item.completed && !item.batchFull
  );

  if (availableRoles.length === 0) return undefined;

  const index = Math.floor(Math.random() * availableRoles.length);

  return availableRoles[index].role;
};