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
        <h2>Đăng Ký</h2>
        <div className="group-form">
          <Input type="button" value="ĐĂNG KÝ BẰNG FACEBOOK" />
        </div>
        <div className=" group-form">
          <div className="login-or">
            <hr />
            <h5>hoặc</h5>
          </div>
        </div>
        <div className="group-form">
          <div className="firstname">
            <Input
              {...register("firstName", { required: true })}
              placeholder="Họ"
            />
            {errors.firstName && <p>Bạn phải nhập họ.</p>}
          </div>
          <div className="lastname">
            <Input
              {...register("lastName", { required: true })}
              placeholder="Tên"
            />
            {errors.firstName && (
              <p className="placeholer-name">Bạn phải nhập tên.</p>
            )}
          </div>
        </div>
        <div className="group-form">
          <Input
            {...register("email", { required: true })}
            placeholder="Nhập tên đăng nhập/ Email"
            type="email"
          />
          {errors.firstName && <p>Bạn phải nhập tên đăng nhập/ Email.</p>}
        </div>
        <div className="group-form">
          <Input
            {...register("password", { required: true })}
            placeholder="Nhập mật khẩu"
            type="password"
          />
          {errors.lastName && <p>Bạn phải nhập mật khẩu.</p>}
        </div>
        <div className="group-form">
          <Input type="submit" value="ĐĂNG KÝ NGAY" />
        </div>
        <p className="signup">
          Khi bấm Đăng ký, bạn đã đồng ý với <a href="/#">chính sách</a> của
          tracnghiem.vn <a href="/#"> điều kiện sử dụng </a>
        </p>
      </form>
    </div>
  );
}
