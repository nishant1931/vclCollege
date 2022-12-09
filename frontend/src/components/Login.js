import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginStudent } from "../actions/studentActions";
import AlertMessage from "./AlertMessage";
import Loader from "./Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    dispatch(loginStudent(email, password));
  };
  return (
    <Paper sx={{ maxWidth: "600px", margin: "30px auto", p: 2 }}>
      {loading && <Loader />}
      {error && (
        <AlertMessage variant="filled" severity="error">
          {error}
        </AlertMessage>
      )}
      <Box component="form" onSubmit={submitHandler}>
        <Typography variant="h4" component="h4" py={2}>
          Student Login
        </Typography>
        <Box component="div" py={2}>
          <TextField
            name="email"
            value={email}
            variant="outlined"
            label="Email"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box component="div" py={2}>
          <TextField
            id="outlined-password-input"
            name="password"
            value={password}
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
      <Box pt={2}>
        New Student?
        <Link to="/student/register" variant="text">
          <Button component="span" variant="text">
            Register here
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default Login;
