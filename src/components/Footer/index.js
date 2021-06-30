import React from "react";
import "./style.scss";
import Logo from "../Image/logo__footer.png";
export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer__logo">
          <img src={Logo} alt="" />
        </div>
        <ul className="list__infor">
          <li className="list__infor-item">
            <ul className="list__subject">
              <li className="list__subject-item">
                <a href="/#">Thi THPT QG</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Môn Toán-Văn-Anh</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Môn Lý-Hoá-Sinh</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Môn Sử-Địa-GDCD</a>
              </li>
            </ul>
          </li>
          <li className="list__infor-item">
            <ul className="list__subject">
              <li className="list__subject-item">
                <a href="/#">Đề kiểm tra</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Đề thi HK1, HK2</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Kiểm tra 1 tiết</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Kiểm tra 15 phút</a>
              </li>
            </ul>
          </li>
          <li className="list__infor-item">
            <ul className="list__subject">
              <li className="list__subject-item">
                <a href="/#">English Test</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Ngữ pháp tiếng Anh</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Từ vựng Tiếng Anh</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Tiếng Anh THPT QG</a>
              </li>
            </ul>
          </li>
          <li className="list__infor-item">
            <ul className="list__subject">
              <li className="list__subject-item">
                <a href="/#">IT Test</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Tin học văn phòng</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Lập trình Web/App</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Quản trị hệ thống</a>
              </li>
            </ul>
          </li>
          <li className="list__infor-item">
            <ul className="list__subject">
              <li className="list__subject-item">
                <a href="/#">Đại học</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Môn đại cương</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Chuyên ngành Kinh tế</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Chuyên ngành Kỹ thuật</a>
              </li>
            </ul>
          </li>
          <li className="list__infor-item">
            <ul className="list__subject">
              <li className="list__subject-item">
                <a href="/#">Hướng nghiệp</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Bằng lái xe máy/môtô</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Thi Công/Viên chức</a>
              </li>
              <li className="list__subject-item">
                <a href="/#">Bằng lái xe Ô tô</a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="footer__copyright">
          Copyright © 2020 by Tracnghiem.net
        </div>
      </div>
    </footer>
  );
}
