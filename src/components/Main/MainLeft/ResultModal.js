import React, { useContext, useEffect, useState } from "react";
import { mainExam } from "../index";
import { examContainerContext } from "./Exam";
export default function ResultModal({ yourResult, onOpenDone }) {
  // context
  const context = useContext(mainExam);
  const contextExam = useContext(examContainerContext);

  // state
  const [resultFinal, setResultFinal] = useState([]);

  useEffect(() => {
    const result = [];
    context.dataTest.map((item) =>
      item.answers.map((i) => i.result === true && result.push(i))
    );

    setResultFinal(result);
  }, [context.dataTest]);
  const totalPoint = (10 / context.dataTest.length) * yourResult.result_True;
  return (
    <>
      <div className="modal">
        <div className="overlay" onClick={onOpenDone}></div>
        <div className="modal-result">
          <h1 className="modal-header">KẾT QUẢ</h1>
          <div className="modal-body">
            <div className="modal-body__title">
              <p>Thời gian: {context.seconds_to(600 - context.timer)}</p>
              <p>
                Tổng điểm:
                {totalPoint.toFixed(2)}
                điểm
              </p>
              <p>Số câu đúng: {yourResult.result_True}</p>
              <p>Số câu Sai: {yourResult.result_False}</p>
            </div>
            <div className="modal-body__table">
              <h2>Đáp án của bạn</h2>
              <div className="modal-body__table-result">
                {contextExam.selectedRadio.map((i, index) => (
                  <span key={index}>
                    {i.result
                      ? `${i.parent_id.slice(-1)} - Đ`
                      : `${i.parent_id.slice(-1)} - S`}
                  </span>
                ))}
                <br />
              </div>
            </div>
            <div className="modal-body__table">
              <h2>Đáp án đúng</h2>
              <div className="modal-body__table-result">
                {resultFinal.map((item, index) => (
                  <span key={index}>
                    {`${index + 1} - ${item.content_answer.slice(0, 1)}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <p onClick={onOpenDone}>
              <i className="fas fa-angle-left"></i> Kết Thúc
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
