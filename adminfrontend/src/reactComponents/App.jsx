import '../assets/css/App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardPage from "./dashboardPage/DashboardPage";
import LoginPage from "./loginPage/LoginPage";
import PrivateAdminRoutes from "../config/routes/PrivateAdminRoutes";

export default function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route
                  exact
                  path="/login"
                  element={<LoginPage />}
              />
              <Route element={<PrivateAdminRoutes />}>
                  <Route exact path="/dashboard" element={<DashboardPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

