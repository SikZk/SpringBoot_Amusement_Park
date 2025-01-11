import '../assets/css/App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./loginPage/LoginPage";
import PrivateAdminRoutes from "../config/routes/PrivateAdminRoutes";
import HomePage from "./homePage/HomePage";


export default function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route
                  exact
                  path="/login"
                  element={<LoginPage />}
              />
              <Route
                  exact
                  path="/"
                  element={<HomePage />}
              />
              <Route element={<PrivateAdminRoutes />}>

              </Route>
          </Routes>
      </BrowserRouter>
  );
}

