import React from "react";
import Button from "../../../common/Button";
export default function Notify({ timer, onContinue, turnExam, seconds_to }) {
  return (
    <>
      <div className="overlay"></div>
      <div className="notify">
        <h1>Bạn còn 40 câu chưa trả lời</h1>
        <p>Thời gian còn {seconds_to(timer)}</p>
        <p>Bạn đồng ý nộp bài chư ?</p>
        <div className="buttons">
          <Button type="submit" value="Nộp bài" onClick={turnExam} />
          <Button type="button" value="Làm tiếp" onClick={onContinue} />
        </div>
      </div>
    </>
  );
}
