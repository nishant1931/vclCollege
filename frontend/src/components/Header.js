import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentLogout } from "../actions/studentActions";
import { staffLogout } from "../actions/staffActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentLogin = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLogin;

  const staffLogin = useSelector((state) => state.staffLogin);
  const { staffInfo } = staffLogin;

  const studentLogoutHandler = () => {
    dispatch(studentLogout());
    navigate("/");
  };

  const staffLogoutHandler = () => {
    dispatch(staffLogout());
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/"> VCL College </Link>
          </Typography>

          {studentInfo ? (
            <>
              <Link to={`/student/${studentInfo._id}`}>
                <Button color="inherit">{studentInfo.name}</Button>
              </Link>
              <Button onClick={studentLogoutHandler} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            !staffInfo && (
              <Link to="/student/login">
                <Button color="inherit">Student Login</Button>
              </Link>
            )
          )}
          {staffInfo ? (
            <>
              <Button color="inherit">{staffInfo.name}</Button>
              <Button onClick={staffLogoutHandler} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            !studentInfo && (
              <Link to="/staff/login">
                <Button color="inherit">Staff Login</Button>
              </Link>
            )
          )}

          {staffInfo && (
            <Link to="/studentdetails">
              <Button color="inherit">Student Details</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
