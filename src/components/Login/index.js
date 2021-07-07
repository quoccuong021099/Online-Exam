import React from "react";
import { useForm } from "react-hook-form";
import "./style.scss";
import Input from "../../common/Input";
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
            <span>hoặc</span>
          </div>
        </div>
        <div className="group-form">
          <Input
            {...register("firstName", { required: true })}
            placeholder="Nhập tên đăng nhập"
          />
          {errors.firstName && <p>Bạn phải nhập tên đăng nhập.</p>}
        </div>
        <div className="group-form">
          <Input
            {...register("lastName", { required: true })}
            placeholder="Nhập mật khẩu"
          />
          {errors.lastName && <p>Bạn phải nhập tên mật khẩu.</p>}
        </div>
        <p class="forget-password">
          Quên mật khẩu? <a href="/#"> Nhấn vào đây</a>
        </p>
        <div className="group-form">
          <Input type="submit" value="ĐĂNG NHẬP" />
        </div>
        <p class="signup">
          Nếu bạn chưa có tài khoản? <a href="/#"> Đăng ký ngay</a>
        </p>
      </form>
    </div>
  );
}
