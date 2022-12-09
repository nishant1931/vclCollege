import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerStudent } from "../actions/studentActions";
import AlertMessage from "./AlertMessage";
import Loader from "./Loader";

const StudentRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentLogin = useSelector((state) => state.studentLogin);
  const { loading, error, studentInfo } = studentLogin;

  useEffect(() => {
    if (studentInfo) {
      navigate(`/student/${studentInfo._id}`);
    }
  }, [navigate, studentInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(registerStudent(name, email, password));
    }
  };

  return (
    <Paper sx={{ maxWidth: "600px", margin: "30px auto", p: 2 }}>
      {loading && <Loader />}
      {message && (
        <AlertMessage variant="filled" severity="error">
          {message}
        </AlertMessage>
      )}
      {error && (
        <AlertMessage variant="filled" severity="error">
          {error}
        </AlertMessage>
      )}
      <Box component="form" onSubmit={submitHandler}>
        <Typography variant="h4" component="h4" py={2}>
          Student Register
        </Typography>
        <Box component="div" py={2}>
          <TextField
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            variant="outlined"
            label="Name"
            fullWidth
            required
          />
        </Box>
        <Box component="div" py={2}>
          <TextField
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            variant="outlined"
            label="Email"
            fullWidth
            required
          />
        </Box>
        <Box component="div" py={2}>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
          />
        </Box>
        <Box component="div" py={2}>
          <TextField
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            required
          />
        </Box>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </Box>
      <Box pt={2}>
        Already a student?
        <Link to="/student/login">
          <Button component="span" variant="text">
            Login here
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default StudentRegister;
