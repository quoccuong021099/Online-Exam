import React, { useContext } from "react";
import { contextApp } from "../../App";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyleLogin } from "./styleLogin";
import Container from "@material-ui/core/Container";
// validation
const schema = yup.object().shape({
  username: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bạn phải nhập tên đăng nhập!"),
  password: yup.string().required("Bạn phải nhập mật khẩu!"),
});

export default function Login() {
  const classes = useStyleLogin();

  // context
  const contextOfApp = useContext(contextApp);

  // use history
  const history = useHistory();

  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // submit form
  const onSubmit = (data) => {
    const duplicateUserName = contextOfApp.listUsers.find(
      (i) => i.username === data.username && i.password === data.password
    );
    if (duplicateUserName) {
      history.push("/");
      alert("Đăng nhập thành công");
      localStorage.setItem("user-info", JSON.stringify(duplicateUserName));
      contextOfApp.reset("login");
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu");
    }
  };
  return (
    <Container maxWidth="md">
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h2" className={classes.h2}>
          Đăng Nhập
        </Typography>
        <Box className={classes.groupForm}>
          <Button
            className={classes.BtnFb}
            variant="contained"
            fullWidth
            size="large"
          >
            ĐĂNG NHẬP BẰNG FACEBOOK
          </Button>
        </Box>
        <Box className={classes.loginOr} padding={2}>
          <hr />
          <Typography component="h5" className={classes.h5}>
            hoặc
          </Typography>
        </Box>
        <Box className={classes.groupForm}>
          <TextField
            label="Nhập tên đăng nhập/ Email"
            variant="outlined"
            {...register("username")}
            fullWidth
            autoComplete="true"
          />
          <Typography component="p" className={classes.p}>
            {" "}
            {errors.username?.message}
          </Typography>
        </Box>
        <Box className={classes.groupForm}>
          <TextField
            label="Nhập mật khẩu"
            variant="outlined"
            {...register("password")}
            type="password"
            fullWidth
            autoComplete="true"
          />
          <Typography component="p" className={classes.p}>
            {" "}
            {errors.password?.message}
          </Typography>
        </Box>
        <Typography component="p">
          Quên mật khẩu?{" "}
          <a href="/#" className={classes.a}>
            {" "}
            Nhấn vào đây
          </a>
        </Typography>
        <Box className={classes.groupForm}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            type="submit"
          >
            ĐĂNG NHẬP
          </Button>
        </Box>
        <Typography component="p" className={classes.signup}>
          Nếu bạn chưa có tài khoản?{" "}
          <Link to="/SignUp" className={classes.a}>
            {" "}
            Đăng ký ngay
          </Link>
        </Typography>
      </form>
    </Container>
  );
}
