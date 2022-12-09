import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateStudent } from "../actions/studentActions";
import { STUDENT_UPDATE_RESET } from "../constants/studentConstants";
import AlertMessage from "./AlertMessage";
import Loader from "./Loader";

const StudentHome = () => {
  const [mobile, setMobile] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const studentUpdate = useSelector((state) => state.studentUpdate);
  const { loading, error, success } = studentUpdate;

  const studentLogin = useSelector((state) => state.studentLogin);
  const { studentInfo } = studentLogin;

  const params = useParams();
  const studentId = params.id;

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      setMobile(e.target.value);
    }
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: STUDENT_UPDATE_RESET });
    } else {
      if (studentInfo._id !== studentId) {
        // dispatch(getUserProfile(userId));
      } else {
        setMobile(mobile);
      }
    }
  }, [mobile, dispatch, studentId, success, studentInfo._id]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("File", selectedFile);

    fetch(
      `https://freeimage.host/api/1/upload?key=${process.env.REACT_APP_UPLOAD_API}`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    dispatch(updateStudent({ _id: studentId, mobile }));
  };

  return (
    <Paper sx={{ maxWidth: "600px", margin: "30px auto", p: 2 }}>
      {loading && <Loader />}
      {error && (
        <AlertMessage variant="filled" severity="error">
          {error}
        </AlertMessage>
      )}
      {success && (
        <AlertMessage variant="filled" severity="warning">
          Mobile number updated
        </AlertMessage>
      )}
      <Box component="form" onSubmit={submitHandler}>
        <Typography variant="h4" component="h4" py={2}>
          Please Upload your mobile number and resume here
        </Typography>
        <Box component="div" py={2}>
          <TextField
            name="mobile"
            type="text"
            value={mobile}
            onChange={onChangeHandler}
            variant="outlined"
            label="Mobile Number"
            fullWidth
            required
          />
        </Box>
        <Box component="div" py={2}>
          <TextField
            name="resume"
            type="file"
            fullWidth
            onChange={changeHandler}
            required
          />
          {isFilePicked ? (
            <div>
              <p>Filename: {selectedFile?.name}</p>
              <p>Filetype: {selectedFile?.type}</p>
              <p>Size in bytes: {selectedFile?.size}</p>
              <p>
                lastModifiedDate:{" "}
                {selectedFile?.lastModifiedDate.toLocaleDateString()}
              </p>
              <p>
                lastModifiedTime:{" "}
                {selectedFile?.lastModifiedDate.toLocaleTimeString()}
              </p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
        </Box>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Paper>
  );
};

export default StudentHome;
