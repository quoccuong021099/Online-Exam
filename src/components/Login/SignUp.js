import { useForm } from "react-hook-form";
import "./style.scss";
import Input from "../../common/Input";
import { useHistory } from "react-router";
import { v4 } from "uuid";
import { contextApp } from "../../App";
import { useContext } from "react";
export default function SignUp() {
  const contextOfApp = useContext(contextApp);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
            {errors.firstname && <p>Bạn phải nhập họ.</p>}
          </div>
          <div className="lastname">
            <Input
              autoComplete="true"
              {...register("lastname", { required: true })}
              placeholder="Tên"
            />
            {errors.lastname && (
              <p className="placeholer-name">Bạn phải nhập tên.</p>
            )}
          </div>
        </div>
        <div className="group-form">
          <Input
            autoComplete="true"
            {...register("username", { required: true })}
            placeholder="Nhập tên đăng nhập/ Email"
            type="text"
          />
          {errors.username && <p>Bạn phải nhập tên đăng nhập/ Email.</p>}
        </div>
        <div className="group-form">
          <Input
            autoComplete="true"
            {...register("password", { required: true })}
            placeholder="Nhập mật khẩu"
            type="password"
          />
          {errors.password && <p>Bạn phải nhập mật khẩu.</p>}
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
