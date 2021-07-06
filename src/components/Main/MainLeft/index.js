import React, { useEffect, useState } from "react";
import Exam from "./Exam";
import Oclock from "../../Oclock";
import "./style.scss";

export default function MainLeft() {
  const [dataTest, setDataTest] = useState([]);
  const [pause, setPause] = useState(false);
  const [turn, setTurn] = useState(0);
  const [timer, setTimer] = useState(0);

  const getTimeDown = (data) => {
    setTimer(data);
  };

  const seconds_to = (sec) => {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "00");
    sec < 1 ? (sec = "00") : void 0;
    min.toString().length === 1 ? (min = "0" + min) : void 0;
    sec.toString().length === 1 ? (sec = "0" + sec) : void 0;
    return hours + ":" + min + ":" + sec;
  };

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
    setPause(true);
  };
  return (
    <div className="main__left">
      <Oclock pause={pause} getTimeDown={getTimeDown} seconds_to={seconds_to} />
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
          <Exam
            dataTest={dataTest}
            turnExam={turnExam}
            timer={timer}
            seconds_to={seconds_to}
          />
        )}
      </div>
    </div>
  );
}
