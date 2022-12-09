import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listStudents } from "../actions/studentActions";
import AlertMessage from "./AlertMessage";
import Loader from "./Loader";

const StudentDetails = () => {
  const dispatch = useDispatch();

  const studentLists = useSelector((state) => state.studentLists);
  const { loading, error, students } = studentLists;

  

  useEffect(() => {
    dispatch(listStudents());
  }, [dispatch]);

  return (
    <Container>
      <h1>Student Details</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant="filled" severity="error">
          {error}
        </AlertMessage>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Contact Number </TableCell>
                <TableCell align="center">Resume File </TableCell>
                <TableCell align="center">Uploaded on </TableCell>
                <TableCell align="center">Uploaded at </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students?.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.mobile}</TableCell>
                  <TableCell align="center">{row.resume}</TableCell>
                  <TableCell align="center">{"16 Dec 2022"}</TableCell>
                  <TableCell align="center">{"10:12"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default StudentDetails;
