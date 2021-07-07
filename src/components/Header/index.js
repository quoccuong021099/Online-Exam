import React from "react";
import Logo from "../Image/logo.png";
import "./style.scss";
export default function Header() {
  return (
    <>
      <header>
        <div className="header">
          <a href="/#">
            <img src={Logo} alt="" className="header__logo" />
          </a>

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
            <a href="/#">
              <span className="header__login-name">Đăng nhập</span>
              <span className="header__login-icon"></span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
