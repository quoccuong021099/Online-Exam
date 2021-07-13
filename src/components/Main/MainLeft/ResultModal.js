import React, { useContext, useEffect, useState } from "react";
import { mainExam } from "../index";
import { examContainerContext } from "./Exam";
import { contextApp } from "../../../App";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

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
      <Box className="modal">
        <Box className="overlay" onClick={onOpenDone}></Box>
        <Box className="modal-result">
          <Typography component="h1" className="modal-header">
            KẾT QUẢ
          </Typography>
          <Box className="modal-body">
            <Box className="modal-body__title">
              <Typography component="p">
                Thời gian: {context.formatTime(600 - context.timeDown)}
              </Typography>
              <Typography component="p">
                Tổng điểm:
                {totalPoint.toFixed(2)}
                điểm
              </Typography>
              <Typography component="p">
                Số câu đúng: {yourResult.result_True}
              </Typography>
              <Typography component="p">
                Số câu Sai: {yourResult.result_False}
              </Typography>
            </Box>
            <Box className="modal-body__table">
              <Typography component="h2">Đáp án của bạn</Typography>
              <Box className="modal-body__table-result">
                {contextExam.selectedRadio.map((i, index) => (
                  <span key={index}>
                    {i.result
                      ? `${i.parent_id.slice(-1)} - Đ`
                      : `${i.parent_id.slice(-1)} - S`}
                  </span>
                ))}
                <br />
              </Box>
            </Box>
            <Box className="modal-body__table">
              <Typography component="h2">Đáp án đúng</Typography>
              <Box className="modal-body__table-result">
                {resultFinal.map((item, index) => (
                  <span key={index}>
                    {`${index + 1} - ${item.content_answer.slice(0, 1)}`}
                  </span>
                ))}
              </Box>
            </Box>
          </Box>
          <Box className="modal-footer" onClick={getRank}>
            <Typography component="p" onClick={onOpenDone}>
              <i className="fas fa-angle-left"></i> Kết Thúc
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
