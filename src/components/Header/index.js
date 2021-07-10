import React, { useContext, useState } from "react";
import Logo from "../Image/logo.png";
import "./style.scss";
import { Link, useHistory } from "react-router-dom";
import { contextApp } from "../../App";
export default function Header() {
  // context
  const contextOfApp = useContext(contextApp);

  const history = useHistory();

  const [logout, setLogout] = useState(false);

  const data = JSON.parse(localStorage.getItem("user-info"));

  const logoutUser = () => {
    localStorage.removeItem("user-info");
    contextOfApp.reset("logout");
    setLogout(!logout);
    history.push("/login");
  };
  return (
    <>
      <header>
        <div className="header">
          <Link to="/">
            <img src={Logo} alt="" className="header__logo" />
          </Link>

          <ul className="header__nav">
            <li className="header__nav-item active">
              <a href="/#" className="header__nav-link">
                THI THPTQG
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/#" className="header__nav-link">
                ĐỀ THI KIỂM TRA
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/#" className="header__nav-link">
                ENGLISH TEST
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/#" className="header__nav-link">
                IT TEST
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/#" className="header__nav-link">
                ĐẠI HỌC
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/#" className="header__nav-link">
                HƯỚNG NGHIỆP
              </a>
            </li>
            <li className="header__nav-item">
              <a href="/#" className="header__nav-link">
                TÀI LIỆU
              </a>
            </li>
          </ul>
          <div className="header__login">
            <Link to={data ? "#" : "/Login"} className="link">
              <span className="header__login-name">
                {data ? data.firstname : "Đăng nhập"}
              </span>
              <span className="header__login-icon"></span>
            </Link>
            {data && (
              <div className="logout" onClick={logoutUser}>
                Logout
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
