import { useForm } from "react-hook-form";
import "./style.scss";
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
    <Box className="wrapper-login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h2">Đăng Ký</Typography>
        <Box className="group-form">
          <Button variant="contained" color="primary" fullWidth size="large">
            ĐĂNG KÝ BẰNG FACEBOOK
          </Button>
        </Box>
        <Box className=" group-form">
          <Box className="login-or">
            <hr />
            <Typography component="h5">hoặc</Typography>
          </Box>
        </Box>
        <Box className="group-form">
          <Box className="firstname">
            <TextField
              id="outlined-basic"
              label="Họ"
              variant="outlined"
              {...register("firstname")}
              fullWidth
            />
            <Typography component="p">{errors.firstname?.message}</Typography>
          </Box>
          <Box className="lastname">
            <TextField
              id="outlined-basic"
              label="Tên"
              variant="outlined"
              {...register("lastname")}
              fullWidth
            />
            <p className="placeholer-name">{errors.lastname?.message}</p>
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
          <Typography component="p">{errors.username?.message}</Typography>
        </Box>
        <Box className="group-form">
          <TextField
            id="outlined-basic"
            label="Nhập mật khẩu"
            variant="outlined"
            {...register("password")}
            fullWidth
            type="password"
          />
          <Typography component="p">{errors.password?.message}</Typography>
        </Box>
        <Box className="group-form">
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
        <Typography component="p" className="signup">
          Khi bấm Đăng ký, bạn đã đồng ý với <a href="/#">chính sách</a> của
          tracnghiem.vn <a href="/#"> điều kiện sử dụng </a>
        </Typography>
      </form>
    </Box>
  );
}
