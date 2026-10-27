import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import MainLayout from "./components/layout/MainLayout.jsx";

import Dashboard from "./pages/Dashboard";
import Officers from "./pages/Officers";
import RosterGenerator from "./pages/RosterGenerator";
import RosterHistory from "./pages/RosterHistory";
import Settings from "./pages/Settings";
import { OfficerProvider } from "./context/OfficerContext.jsx";
import { RosterProvider } from "./context/RosterContext.jsx";
import { RosterHistoryProvider } from "./context/RosterHistoryContext";



function App() {

  return (

    <BrowserRouter>
    <RosterProvider>
      <OfficerProvider>
        <RosterHistoryProvider>
      <MainLayout>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/officers"
            element={<Officers />}
          />

          <Route
            path="/roster"
            element={<RosterGenerator />}
          />

          <Route
            path="/history"
            element={<RosterHistory />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Routes>

      </MainLayout>
      </RosterHistoryProvider>
      </OfficerProvider>
      </RosterProvider>
    </BrowserRouter>

  );

}

export default App;