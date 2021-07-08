import { useForm } from "react-hook-form";
import "./style.scss";
import Input from "../../common/Input";
import { useHistory } from "react-router";
export default function Register() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = async (data) => {
  //   console.log(data);
  //   const requestOptions = {
  //     method: 'POST',
  //     Accept: "application/json",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // "Accept": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   };
  //   let result = await fetch("http://localhost:3000/users", requestOptions);
  //   result = await result.json();
  //   localStorage.setItem("user-info", JSON.stringify(result));
  //   history.push("/");
  // };
  function onSubmit(data) {
    console.log(data);
    const requestOptions = {
      method: "POST",
      Accept: "application/json",
      headers: {
        "Content-Type": "application/json",
        // "Accept": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:3000/users", requestOptions).then((response) =>
      response.json()
    );
    // result =  result.json();
    // localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/");
  }
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
              {...register("firstname", { required: true })}
              placeholder="Họ"
            />
            {errors.firstname && <p>Bạn phải nhập họ.</p>}
          </div>
          <div className="lastname">
            <Input
              {...register("lastname", { required: true })}
              placeholder="Tên"
            />
            {errors.lastName && (
              <p className="placeholer-name">Bạn phải nhập tên.</p>
            )}
          </div>
        </div>
        <div className="group-form">
          <Input
            {...register("username", { required: true })}
            placeholder="Nhập tên đăng nhập/ Email"
            type="text"
          />
          {errors.username && <p>Bạn phải nhập tên đăng nhập/ Email.</p>}
        </div>
        <div className="group-form">
          <Input
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
