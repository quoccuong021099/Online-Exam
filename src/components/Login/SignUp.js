import { useForm } from "react-hook-form";
import "./style.scss";
import Input from "../../common/Input";
import { useHistory } from "react-router";
import { v4 } from "uuid";
import { contextApp } from "../../App";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  };

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
              autoComplete="true"
              {...register("firstname", { required: true })}
              placeholder="Họ"
            />
            <p>{errors.firstname?.message}</p>
          </div>
          <div className="lastname">
            <Input
              autoComplete="true"
              {...register("lastname", { required: true })}
              placeholder="Tên"
            />
            <p className="placeholer-name">{errors.lastname?.message}</p>
          </div>
        </div>
        <div className="group-form">
          <Input
            autoComplete="true"
            {...register("username", { required: true })}
            placeholder="Nhập tên đăng nhập/ Email"
            type="text"
          />
          <p>{errors.username?.message}</p>
        </div>
        <div className="group-form">
          <Input
            autoComplete="true"
            {...register("password", { required: true })}
            placeholder="Nhập mật khẩu"
            type="password"
          />
          <p>{errors.password?.message}</p>
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
