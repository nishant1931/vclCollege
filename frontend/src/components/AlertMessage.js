import { Alert } from "@mui/material";
import React from "react";

const AlertMessage = ({ variant, children, severity }) => {
  return (
    <Alert variant={variant} severity={severity}>
      {children}
    </Alert>
  );
};

AlertMessage.defaultProps = {
  variant: "info",
};

export default AlertMessage;
