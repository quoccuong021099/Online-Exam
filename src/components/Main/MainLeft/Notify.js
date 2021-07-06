import React, { useContext } from "react";
import Button from "../../../common/Button";
import { mainLeftExam } from "./index";
import { examContainerContext } from "./Exam";
export default function Notify() {
  const context = useContext(mainLeftExam);
  const contextExam = useContext(examContainerContext);
  return (
    <>
      <div className="overlay"></div>
      <div className="notify">
        <h1>Bạn còn 40 câu chưa trả lời</h1>
        <p>Thời gian còn {context.seconds_to(context.timer)}</p>
        <p>Bạn đồng ý nộp bài chư ?</p>
        <div className="buttons">
          <Button type="submit" value="Nộp bài" onClick={context.turnExam} />
          <Button
            type="button"
            value="Làm tiếp"
            onClick={contextExam.onContinue}
          />
        </div>
      </div>
    </>
  );
}
