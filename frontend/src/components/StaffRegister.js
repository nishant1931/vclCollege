import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const StaffRegister = () => {
  return (
    <Paper sx={{ maxWidth: "600px", margin: "30px auto", p: 2 }}>
      <form autoComplete="off" noValidate>
        <Typography variant="h4" component="h4" py={2}>
          Staff Register
        </Typography>
        <Box component="div" py={2}>
          <TextField
            name="name"
            type="text"
            variant="outlined"
            label="Name"
            fullWidth
          />
        </Box>
        <Box component="div" py={2}>
          <TextField
            name="email"
            type="email"
            variant="outlined"
            label="Email"
            fullWidth
          />
        </Box>
        <Box component="div" py={2}>
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
          />
        </Box>
        <Box component="div" py={2}>
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
          />
        </Box>
        <Button variant="contained">Register</Button>
      </form>
      <Box pt={2}>
        Already a Staff Member?
        <Link to="/staff/login">
          <Button component="span" variant="text">
            Login here
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default StaffRegister;
