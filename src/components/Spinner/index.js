import "./style.scss";
import React from "react";
import Box from "@material-ui/core/Box";

const Spinner = () => (
  <Box className="spinner">
    <Box className="dashed-loading"></Box>
  </Box>
);

export default Spinner;
