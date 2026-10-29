import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Officers from "./pages/Officers.jsx";
import RosterGenerator from "./pages/RosterGenerator.jsx";
import RosterHistory from "./pages/RosterHistory.jsx";
import Settings from "./pages/Settings.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { OfficerProvider } from "./context/OfficerContext.jsx";
import { RosterProvider } from "./context/RosterContext.jsx";
import { RosterHistoryProvider } from "./context/RosterHistoryContext.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RosterProvider>
          <OfficerProvider>
            <RosterHistoryProvider>
              <Routes>
                <Route path="/login" element={<Login />} />

                {/* All application pages require a login. */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="officers" element={<Officers />} />
                    <Route path="roster" element={<RosterGenerator />} />
                    <Route path="history" element={<RosterHistory />} />

                    {/* Settings are admin-only. */}
                    <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                      <Route path="settings" element={<Settings />} />
                    </Route>
                  </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </RosterHistoryProvider>
          </OfficerProvider>
        </RosterProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
