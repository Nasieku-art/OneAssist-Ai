import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Dashboard from "../Pages/Dashboard";
import Accessbility from "../Pages/Accessbility";
import ProtectedRoute from "./ProtectedRoute";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUp />
            </Layout>
          }
        />

        {/* Dashboard and Accessibility are self-contained app shells (they
            render their own header/sidebar inside Dash.jsx), so they should
            NOT be wrapped in the public marketing Layout — otherwise you get
            the Home/Dashboard/Login/Sign Up navbar stacked on top of the
            real dashboard header. They're also gated behind ProtectedRoute,
            so a logged-out user gets sent to /login instead of seeing them. */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Accessbility"
          element={
            <ProtectedRoute>
              <Accessbility />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;