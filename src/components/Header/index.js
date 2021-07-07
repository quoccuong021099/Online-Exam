import React from "react";
import Logo from "../Image/logo.png";
import "./style.scss";
import { Link } from "react-router-dom";
export default function Header() {
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
            <Link to="/Login">
              <span className="header__login-name">Đăng nhập</span>
              <span className="header__login-icon"></span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
