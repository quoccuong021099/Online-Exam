import React, { useContext } from "react";
import { contextApp } from "../../App";
import { useForm } from "react-hook-form";
import "./style.scss";
import Input from "../../common/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";

// validation
const schema = yup.object().shape({
  username: yup
    .string()
    // .email("Email không hợp lệ")
    .required("Bạn phải nhập tên đăng nhập!"),
  password: yup.string().required("Bạn phải nhập mật khẩu!"),
  // .min(3, "Mật khẩu phải từ 3-30 ký tự")
  // .max(30, "Mật khẩu phải từ 3-30 ký tự"),
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
    <div className="wrapper-login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Đăng Nhập</h2>
        <div className="group-form">
          <Input
            type="button"
            value="ĐĂNG NHẬP BẰNG FACEBOOK"
            autoComplete="true"
          />
        </div>
        <div className=" group-form">
          <div className="login-or">
            <hr />
            <h5>hoặc</h5>
          </div>
        </div>
        <div className="group-form">
          <Input
            {...register("username")}
            placeholder="Nhập tên đăng nhập/ Email"
          />
          <p> {errors.username?.message}</p>
        </div>
        <div className="group-form">
          <Input
            {...register("password")}
            placeholder="Nhập mật khẩu"
            type="password"
          />
          <p> {errors.password?.message}</p>
        </div>
        <p className="forget-password">
          Quên mật khẩu? <a href="/#"> Nhấn vào đây</a>
        </p>
        <div className="group-form">
          <Input type="submit" value="ĐĂNG NHẬP" />
        </div>
        <p className="signup">
          Nếu bạn chưa có tài khoản? <Link to="/SignUp"> Đăng ký ngay</Link>
        </p>
      </form>
    </div>
  );
}
