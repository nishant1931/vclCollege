import React from "react";

import Header from "./components/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StudentDetails from "./components/StudentDetails";
import Login from "./components/Login";
import Home from "./components/Home";
import StudentRegister from "./components/StudentRegister";
import StaffLogin from "./components/StaffLogin";
import StaffRegister from "./components/StaffRegister";
import StudentHome from "./components/StudentHome";
import StaffHome from "./components/StaffHome";
import { useSelector } from "react-redux";

const App = () => {
  const studentLogin = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLogin;

  const staffLogin = useSelector((state) => state.staffLogin);
  const { staffInfo } = staffLogin;

  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/student/:id"
            exact
            element={studentInfo ? <StudentHome /> : <Navigate to="/" />}
          />
          <Route path="/student/login" element={<Login />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route
            path="/studentdetails"
            element={staffInfo ? <StudentDetails /> : <Navigate to="/" />}
          />
          <Route
            path="/staff/"
            exact
            element={staffInfo ? <StaffHome /> : <Navigate to="/" />}
          />
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff/register" element={<StaffRegister />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
