import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Dashboard from "../Pages/Dashboard";
import Settings from "../Pages/Settings";
import Accessbility from "../Pages/Accessbility";

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
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
        <Route
          path="/Accessbility"
          element={
            <Layout>
              <Accessbility />
            </Layout>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}

export default Router;
