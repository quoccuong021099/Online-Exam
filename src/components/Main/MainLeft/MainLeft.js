import React, { useEffect, useState } from "react";
import Exam from "./Exam";

export default function MainLeft() {
  const [dataTest, setDataTest] = useState([]);

  const [turn, setTurn] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/question")
      .then((res) => res.json())
      .then(
        (result) => {
          setDataTest(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const turnExam = () => {
    setTurn(turn + 1);
  };

  return (
    <div className="main__left">
      <div className="main__left-title">
        <div className="left">
          <h2>Đề thi thử THPT QG năm 2021 môn Toán</h2>
          <p>Trường THPT Yên Dũng số 2 lần 3</p>
        </div>
      </div>
      <div className="main__left-desc">
        <div className="num-question">
          <span>
            <i className="fas fa-check-square" aria-hidden="true"></i>20 câu
          </span>
        </div>
        <div className="num-minutes">
          <span>
            <i className="fas fa-clock" aria-hidden="true"></i>
            10 phút
          </span>
        </div>
        <div className="num-attempt">
          <span>
            <i className="fa fa-user" aria-hidden="true"></i>
            {turn} lượt thi
          </span>
        </div>
      </div>
      <div className="main__left-content">
        {dataTest.length > 0 && (
          <Exam dataTest={dataTest} turnExam={turnExam} />
        )}
      </div>
    </div>
  );
}
