import React from "react";
import Button from "../../../common/Button";
export default function Notify() {
  return (
    <>
      <div className="overlay"></div>
      <div className="notify">
        <h1>Bạn còn 40 câu chưa trả lời</h1>
        <p>Thời gian còn (00 phút 00 giây)</p>
        <p>Bạn đồng ý nộp bài chư ?</p>
        <div className="buttons">
          <Button type="button" value="Nộp bài" />
          <Button type="button" value="Làm tiếp" />
        </div>
      </div>
    </>
  );
}
