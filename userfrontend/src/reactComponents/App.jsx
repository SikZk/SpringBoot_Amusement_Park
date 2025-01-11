import '../assets/css/App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./loginPage/LoginPage";
import PrivateAdminRoutes from "../config/routes/PrivateAdminRoutes";
import HomePage from "./homePage/HomePage";
import TicketPage from "./ticketPage/TicketPage";
import AccountPage from "./accountPage/AccountPage";

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
                  path="/mytickets"
                  element={<TicketPage />}
              />
              <Route
                  exact
                  path="/myaccount"
                  element={<AccountPage />}
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

