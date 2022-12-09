import { Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <div>
      <Typography
        textAlign="center"
        component="h1"
        mt={10}
        sx={{ fontSize: "48px" }}
      >
        Welcome to the VCL College
      </Typography>
    </div>
  );
};

export default Home;
