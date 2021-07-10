import React, { useContext } from "react";
import Button from "../../../common/Button";
import { mainExam } from "../index";
import { examContainerContext } from "./Exam";
export default function Notify() {
  const context = useContext(mainExam);
  const contextExam = useContext(examContainerContext);
  return (
    <>
      <div className="overlay"></div>
      <div className="notify">
        {context.timer !== 0 ? (
          <>
            <h1>
              Bạn còn{" "}
              {context.dataTest.length - contextExam.selectedRadio.length} câu
              chưa trả lời
            </h1>
            <p>Thời gian còn {context.seconds_to(context.timer)}</p>
            <p>Bạn đồng ý nộp bài chư ?</p>
            <div className="buttons">
              <Button
                type="submit"
                value="Nộp bài"
                onClick={context.turnExam}
              />
              <Button
                type="button"
                value="Làm tiếp"
                onClick={contextExam.onContinue}
              />
            </div>
          </>
        ) : (
          <>
            <div className="time-out">
              <h1>Đã hết thời gian vui lòng nhấn nút nộp bài</h1>
              <Button
                type="submit"
                value="Nộp bài"
                onClick={context.turnExam}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
