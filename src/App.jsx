import { useState } from "react";
import Overview from "./admins/Overview";
import CreateTicket from "./users/CreateTicket";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import { RecoilRoot } from "recoil";
import { AuthContextProvider } from "./utils/context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tickets from "./admins/Tickets";
import DetailTicket from "./admins/DetailTicket";
import FindTicket from "./users/FindTicket";
import Detail from "./users/Detail";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18nConfig";
import { AdminRestrictedRoute, UserRestrictedRoute } from "./routes/route";

function App() {
  return (
    <RecoilRoot>
      <AuthContextProvider>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/create-ticket"
                element={
                  <UserRestrictedRoute>
                    <CreateTicket />
                  </UserRestrictedRoute>
                }
              />
              <Route
                path="/overview"
                element={
                  <AdminRestrictedRoute>
                    <Overview />
                  </AdminRestrictedRoute>
                }
              />
              <Route
                path="/tickets"
                element={
                  <AdminRestrictedRoute>
                    <Tickets />
                  </AdminRestrictedRoute>
                }
              />
              <Route
                path="/tickets/:unresolved"
                element={
                  <AdminRestrictedRoute>
                    <Tickets />
                  </AdminRestrictedRoute>
                }
              />
              <Route
                path="/ticket/:id"
                element={
                  <AdminRestrictedRoute>
                    <DetailTicket />
                  </AdminRestrictedRoute>
                }
              />
              <Route
                path="/find-ticket"
                element={
                  <UserRestrictedRoute>
                    <FindTicket />
                  </UserRestrictedRoute>
                }
              />
              <Route
                path="/find-ticket/:id"
                element={
                  <UserRestrictedRoute>
                    <Detail />
                  </UserRestrictedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </I18nextProvider>
      </AuthContextProvider>
    </RecoilRoot>
  );
}

export default App;
