import '../assets/css/App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./loginPage/LoginPage";
import HomePage from "./homePage/HomePage";
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
                  <Route
                      exact
                      path="/"
                      element={<HomePage />}
                  />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

