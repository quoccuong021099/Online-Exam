import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { v4 } from "uuid";
import { contextApp } from "../../App";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useStyleLogin } from "./styleLogin";
import { Container } from "@material-ui/core";
// validation
const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("Bạn phải nhập họ!")
    .min(3, "Họ phải từ 3-30 ký tự")
    .max(30, "Họ phải từ 3-30 ký tự"),
  lastname: yup
    .string()
    .required("Bạn phải nhập tên!")
    .min(3, "Tên phải từ 3-30 ký tự")
    .max(30, "Tên phải từ 3-30 ký tự"),
  username: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bạn phải nhập tên đăng nhập!"),
  password: yup
    .string()
    .required("Bạn chưa nhập trường này!")
    .min(3, "Mật khẩu phải từ 3-30 ký tự")
    .max(30, "Mật khẩu phải từ 3-30 ký tự"),
});

export default function SignUp() {
  const classes = useStyleLogin();
  // list context
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
  const onSubmit = async (data) => {
    if (!contextOfApp.listUsers.find((i) => i.username === data.username)) {
      data.id = v4();
      let result = await fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      result = await result.json();
      localStorage.setItem("user-info", JSON.stringify(result));
      contextOfApp.reset(data);
      history.push("/");
    } else {
      alert("Tên đăng nhập bị trùng");
    }
  };

  return (
    <Container maxWidth="md">
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h2" className={classes.h2}>
          Đăng Ký
        </Typography>
        <Box className={classes.groupForm}>
          <Button
            variant="contained"
            className={classes.BtnFb}
            fullWidth
            size="large"
          >
            ĐĂNG KÝ BẰNG FACEBOOK
          </Button>
        </Box>
        <Box className={classes.loginOr} padding="15px 20px">
          <hr />
          <Typography component="h5" className={classes.h5}>
            hoặc
          </Typography>
        </Box>
        <Box className={classes.groupForm}>
          <Box className={classes.firstname}>
            <TextField
              autoComplete="true"
              label="Họ"
              variant="outlined"
              {...register("firstname")}
              fullWidth
              error={errors.firstname && true}
              helperText={errors.firstname && errors.firstname?.message}
            />
          </Box>
          <Box className={classes.lastname}>
            <TextField
              autoComplete="true"
              label="Tên"
              variant="outlined"
              {...register("lastname")}
              fullWidth
              error={errors.lastname && true}
              helperText={errors.lastname && errors.lastname?.message}
            />
          </Box>
        </Box>
        <Box className={classes.groupForm}>
          <TextField
            autoComplete="true"
            label="Nhập tên đăng nhập/ Email"
            variant="outlined"
            {...register("username")}
            fullWidth
            error={errors.username && true}
            helperText={errors.username && errors.username?.message}
          />
        </Box>
        <Box className={classes.groupForm}>
          <TextField
            label="Nhập mật khẩu"
            variant="outlined"
            {...register("password")}
            fullWidth
            type="password"
            autoComplete="true"
            error={errors.password && true}
            helperText={errors.password && errors.password?.message}
          />
        </Box>
        <Box className={classes.groupForm}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            type="submit"
          >
            ĐĂNG KÝ NGAY
          </Button>
        </Box>
        <Typography component="p" className={classes.signup}>
          Khi bấm Đăng ký, bạn đã đồng ý với{" "}
          <a href="/#" className={classes.a}>
            chính sách của tracnghiem.vn{" "}
          </a>
        </Typography>
      </form>
    </Container>
  );
}
