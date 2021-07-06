import React from "react";
import "./style.scss";
export default function MainRight() {
  return (
    <div className="main__right">
      <div className="empty"></div>
      <div className="cart__group">
        <div className="cart__group-header">
          <h2>Top 10/188 lượt thi</h2>
        </div>
        <ul className="cart__group-body">
          <li className="cart__group-item">
            <ul className="cart__group-item-title">
              <li>Tên</li>
              <li>Điểm</li>
              <li>Thời gian</li>
            </ul>
          </li>
          <li className="cart__group-item">
            <ul className="cart__group-item-rank">
              <li> Bùi Trần Đức Duy</li>
              <li>9đ</li>
              <li>5:58</li>
            </ul>
          </li>
          <li className="cart__group-item">
            <ul className="cart__group-item-rank">
              <li> Mangum Seiryu</li>
              <li>9đ</li>
              <li>32:20</li>
            </ul>
          </li>
          <li className="cart__group-item">
            <ul className="cart__group-item-rank">
              <li> Bùi Đạt</li>
              <li>9đ</li>
              <li>53:50</li>
            </ul>
          </li>
        </ul>
        <div className="cart__group-footer">
          <button>Xem thêm</button>
        </div>
      </div>
      <div className="try-it-now">
        <p>Bạn có muốn chinh phục đề thi này</p>
        <a href="/#" className="yes-btn">
          Có, tôi muốn!
        </a>
        <a href="/#" className="facebook-btn">
          Chia sẻ Facebook
        </a>
      </div>
    </div>
  );
}
