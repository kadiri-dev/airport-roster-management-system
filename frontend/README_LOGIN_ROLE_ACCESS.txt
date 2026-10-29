# Airport Roster Management System — login and role access update

This bundle contains the `src/` folder from the source ZIP you supplied, updated with a demo Admin/Viewer login.

## Install the updated source

1. Back up your current project.
2. Extract this ZIP.
3. Copy/merge the included `src/` folder into your existing Vite project, replacing the matching files.
4. Keep your existing `package.json`, `index.html`, `vite.config.js`, and other project configuration files.
5. Run `npm install` if needed, then `npm run dev`.

The ZIP supplied for this update contained `src/` files only; it did not include `package.json`, `index.html`, or `vite.config.js`, so this is an updated source bundle rather than a complete standalone Vite project.

## Demo login credentials

- Admin: `admin` / `admin123`
- Viewer: `viewer` / `viewer123`

## Role behavior

- Admin: can generate/edit/submit/discard roster drafts; add/edit/delete officers; view and delete saved roster history; access Settings.
- Viewer: can view the roster and submitted roster history; cannot edit batches/roles, generate/submit/discard rosters, modify officers, or delete saved rosters; Settings is hidden and restricted.

The roster history is persisted in the current browser's `localStorage`, so it survives refreshes in that same browser. It does **not** synchronize between different computers or browsers. Cross-device shared rosters require a backend/database and proper authentication.

## Security warning

This login is a front-end demonstration only. Both demo passwords are in client-side code and can be discovered by a visitor. The UI restrictions are not sufficient to protect real data. Do not enter real officer details or confidential Customs information. Before production use, implement server-side authentication and role authorization, a protected database, and obtain authorization for external hosting.
