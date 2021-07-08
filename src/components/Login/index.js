import React, { useContext, useEffect, useState } from "react";
import { contextApp } from "../../App";
import { useForm } from "react-hook-form";
import "./style.scss";
import Input from "../../common/Input";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  // context
  const context_App = useContext(contextApp);
  // use form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  // submit form
  const onSubmit = (data) => {
    const duplicateUserName = context_App.listUsers.find(
      (i) => i.username === data.username && i.password === data.password
    );
    if (duplicateUserName) {
      history.push("/");
      alert("Đăng nhập thành công");
      localStorage.setItem("user-info", JSON.stringify(duplicateUserName));
      context_App.reset("login");
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu");
    }
  };
  return (
    <div className="wrapper-login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Đăng Nhập</h2>
        <div className="group-form">
          <Input type="button" value="ĐĂNG NHẬP BẰNG FACEBOOK" />
        </div>
        <div className=" group-form">
          <div className="login-or">
            <hr />
            <h5>hoặc</h5>
          </div>
        </div>
        <div className="group-form">
          <Input
            {...register("username", { required: true })}
            placeholder="Nhập tên đăng nhập/ Email"
          />
          {errors.username && <p>Bạn phải nhập tên đăng nhập/ Email.</p>}
        </div>
        <div className="group-form">
          <Input
            {...register("password", { required: true })}
            placeholder="Nhập mật khẩu"
          />
          {errors.password && <p>Bạn phải nhập tên mật khẩu.</p>}
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
