import React from "react";
import { Link } from "react-router-dom";
export default function Done() {
  return (
    <div className="done">
      <h1>Cảm ơn bạn đã tham gia bài kiểm tra của chúng tôi </h1>
      <h1>Hẹn gặp lại bạn ở bài kiểm tra khác &#9995; &#9995; &#9995;</h1>
      <Link to="/">
        <h2>&#128512;</h2>
      </Link>
    </div>
  );
}
