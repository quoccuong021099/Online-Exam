import React from "react";
import { useForm } from "react-hook-form";
import "./style.scss";
import Input from "../../common/Input";
import { Link } from "react-router-dom";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
            {...register("userName", { required: true })}
            placeholder="Nhập tên đăng nhập/ Email"
          />
          {errors.userName && <p>Bạn phải nhập tên đăng nhập/ Email.</p>}
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
          Nếu bạn chưa có tài khoản? <Link to="/Register"> Đăng ký ngay</Link>
        </p>
      </form>
    </div>
  );
}
