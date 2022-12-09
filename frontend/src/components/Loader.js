import { Box } from "@mui/system";
import React from "react";

const Loader = () => {
  return (
    <Box
      component="span"
      sx={{
        width: "50px",
        height: "50px",
        border: "5px solid #FFF",
        backgroundColor: "red",
        color: "red",
        borderRadius: "50%",
        display: "inlineBlock",
        animation: "rotation 1s linear infinite",
      }}
    ></Box>
  );
};

export default Loader;
