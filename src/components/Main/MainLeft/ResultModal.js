import React, { useContext, useEffect, useState } from "react";
import { mainExam } from "../index";
import { examContainerContext } from "./Exam";
import { contextApp } from "../../../App";
// import { v4 } from "uuid";
export default function ResultModal({ yourResult, onOpenDone }) {
  // context
  const context = useContext(mainExam);
  const contextExam = useContext(examContainerContext);
  const appContext = useContext(contextApp);

  // state
  const [resultFinal, setResultFinal] = useState([]);

  // lấy user trong localStorage
  const user = JSON.parse(localStorage.getItem("user-info"));

  // hàm trả về đáp án đúng của bộ đề
  useEffect(() => {
    const result = [];
    context.dataTest.map((item) =>
      item.answers.map((i) => i.result === true && result.push(i))
    );
    setResultFinal(result);
  }, [context.dataTest]);

  // Tổng điểm
  const totalPoint = (10 / context.dataTest.length) * yourResult.result_True;

  // POST dữ liệu charts lên API
  const getRank = async () => {
    const sortUp = appContext.charts.find((i) => i.id === user.id);
    if (!sortUp) {
      let data = {
        id: user.id,
        lastname: user.lastname,
        firstname: user.firstname,
        point: totalPoint.toFixed(2),
        time: JSON.stringify(600 - context.timeDown),
      };
      let result = await fetch("http://localhost:5000/charts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      result = await result.json();
      localStorage.setItem("charts", JSON.stringify(result));
      appContext.reset(data);
    } else {
      if (
        JSON.parse(sortUp.point) < totalPoint.toFixed(2) ||
        (JSON.parse(sortUp.point) < totalPoint.toFixed(2) &&
          sortUp.time >= 600 - context.timeDown)
      ) {
        sortUp.lastname = user.lastname;
        sortUp.firstname = user.firstname;
        sortUp.point = totalPoint.toFixed(2);
        sortUp.time = JSON.stringify(600 - context.timeDown);
        let result = await fetch(`http://localhost:5000/charts/${sortUp.id}`, {
          method: "PATCH",
          body: JSON.stringify(sortUp),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        result = await result.json();
        localStorage.setItem("charts", JSON.stringify(result));
        appContext.reset(sortUp);
      }
    }
  };

  return (
    <>
      <div className="modal">
        <div className="overlay" onClick={onOpenDone}></div>
        <div className="modal-result">
          <h1 className="modal-header">KẾT QUẢ</h1>
          <div className="modal-body">
            <div className="modal-body__title">
              <p>Thời gian: {context.formatTime(600 - context.timeDown)}</p>
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
          <div className="modal-footer" onClick={getRank}>
            <p onClick={onOpenDone}>
              <i className="fas fa-angle-left"></i> Kết Thúc
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
