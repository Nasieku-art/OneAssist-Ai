import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Dashboard from "../Pages/Dashboard";
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

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Accessbility" element={<Accessbility />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;