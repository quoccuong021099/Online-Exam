import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
export default function Done() {
  return (
    <Box className="done">
      <Typography component="h1">
        Cảm ơn bạn đã tham gia bài kiểm tra của chúng tôi{" "}
      </Typography>
      <Typography component="h1">
        Hẹn gặp lại bạn ở bài kiểm tra khác &#9995; &#9995; &#9995;
      </Typography>
      <Link to="/">
        <Typography component="h2">&#128512;</Typography>
      </Link>
    </Box>
  );
}
