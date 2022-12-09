import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStaff } from "../actions/staffActions";
import AlertMessage from "./AlertMessage";
import Loader from "./Loader";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const staffLogin = useSelector((state) => state.staffLogin);
  const { loading, error, staffInfo } = staffLogin;

  useEffect(() => {
    if (staffInfo) {
      navigate("/staff/");
    }
  }, [navigate, staffInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginStaff(email, password));
  };

  return (
    <Paper sx={{ maxWidth: "600px", margin: "30px auto", p: 2 }}>
      {loading && <Loader />}
      {error && (
        <AlertMessage variant="filled" severity="error">
          {error}
        </AlertMessage>
      )}
      <Box onSubmit={submitHandler} component="form">
        <Typography variant="h4" component="h4" py={2}>
          Staff Login
        </Typography>
        <Box component="div" py={2}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            variant="outlined"
            label="Email"
            fullWidth
          />
        </Box>
        <Box component="div" py={2}>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="outlined-password-input"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
          />
        </Box>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
      {/* <Box pt={2}>
        New Staff Member?
        <Link to="/staff/register" variant="text">
          <Button component="span" variant="text">
            Register here
          </Button>
        </Link>
      </Box> */}
    </Paper>
  );
};

export default StaffLogin;
