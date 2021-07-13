import React, { useContext } from "react";
import { contextApp } from "../../App";
import { useForm } from "react-hook-form";
import "./style.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
// validation
const schema = yup.object().shape({
  username: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bạn phải nhập tên đăng nhập!"),
  password: yup.string().required("Bạn phải nhập mật khẩu!"),
});

export default function Login() {
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
    <Box className="wrapper-login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h2">Đăng Nhập</Typography>
        <Box className="group-form">
          <Button variant="contained" color="primary" fullWidth size="large">
            ĐĂNG NHẬP BẰNG FACEBOOK
          </Button>
        </Box>
        <Box className=" group-form">
          <Box className="login-or">
            <hr />
            <Typography component="h5">hoặc</Typography>
          </Box>
        </Box>
        <Box className="group-form">
          <TextField
            id="outlined-basic"
            label="Nhập tên đăng nhập/ Email"
            variant="outlined"
            {...register("username")}
            fullWidth
          />
          <Typography component="p"> {errors.username?.message}</Typography>
        </Box>
        <Box className="group-form">
          <TextField
            id="outlined-basic"
            label="Nhập mật khẩu"
            variant="outlined"
            {...register("password")}
            type="password"
            fullWidth
          />
          <Typography component="p"> {errors.password?.message}</Typography>
        </Box>
        <Typography component="p" className="forget-password">
          Quên mật khẩu? <a href="/#"> Nhấn vào đây</a>
        </Typography>
        <Box className="group-form">
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
        <Typography component="p" className="signup">
          Nếu bạn chưa có tài khoản? <Link to="/SignUp"> Đăng ký ngay</Link>
        </Typography>
      </form>
    </Box>
  );
}
