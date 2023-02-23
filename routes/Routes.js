import { AnimatePresence } from "framer-motion";
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Class from "../pages/Class";
import Exams from "../pages/Exams";
import Forget from "../pages/Forget";
import Login from "../pages/Login";
import Marks from "../pages/Marks";
import Announcements from "../pages/Announcements";
import Program from "../pages/Program";
import UserInfo from "../pages/UserInfo";
import PrivateRoutes from "./PrivateRoutes";
import Registration from "../pages/Registration";
import AddClass from "../pages/AddClass";
import AddExams from "../pages/AddExams";
import AddProgram from "../pages/AddProgram";
import AdminMarks from "../pages/AdminMarks";
import Profiles from "../pages/Profiles";

const Routers = () => {
  const location = useLocation();

  const token = localStorage.getItem("token");

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route
          path="/"
          element={
            token ? <Navigate to="/announcements" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/announcements" />}
        />
        <Route
          path="/forget"
          element={!token ? <Forget /> : <Navigate to="/announcements" />}
        />
        <Route
          path="/class"
          element={
            <PrivateRoutes>
              <Class />
            </PrivateRoutes>
          }
        />
        <Route
          path="/announcements"
          element={
            <PrivateRoutes>
              <Announcements />
            </PrivateRoutes>
          }
        />
        <Route
          path="/marks"
          element={
            <PrivateRoutes>
              <Marks />
            </PrivateRoutes>
          }
        />
        <Route
          path="/exams"
          element={
            <PrivateRoutes>
              <Exams />
            </PrivateRoutes>
          }
        />
        <Route
          path="/program"
          element={
            <PrivateRoutes>
              <Program />
            </PrivateRoutes>
          }
        />
        <Route
          path="/userinfo"
          element={
            <PrivateRoutes>
              <UserInfo />
            </PrivateRoutes>
          }
        />
        <Route
          path="/registration"
          element={
            <PrivateRoutes>
              <Registration />
            </PrivateRoutes>
          }
        />
        <Route
          path="/addclass"
          element={
            <PrivateRoutes>
              <AddClass />
            </PrivateRoutes>
          }
        />
        <Route
          path="/addexams"
          element={
            <PrivateRoutes>
              <AddExams />
            </PrivateRoutes>
          }
        />
        <Route
          path="/adminprogram"
          element={
            <PrivateRoutes>
              <AddProgram />
            </PrivateRoutes>
          }
        />
        <Route
          path="/adminmarks"
          element={
            <PrivateRoutes>
              <AdminMarks />
            </PrivateRoutes>
          }
        />
        <Route
          path="/editprofiles"
          element={
            <PrivateRoutes>
              <Profiles />
            </PrivateRoutes>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default Routers;
