import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./styles/index.css";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./layouts/DashboardLayout";
import { Toaster } from "./components/ui/toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route
            index
            element={
              <div>
                halo
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
);
