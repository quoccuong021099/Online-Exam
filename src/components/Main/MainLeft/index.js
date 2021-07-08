import React, { useEffect, useState } from "react";
import Exam from "./Exam";
import Oclock from "../../Oclock";
import "./style.scss";
import Spinner from "../../Spinner";
export const mainLeftExam = React.createContext();


export default function MainLeft() {
  // List state
  const [dataTest, setDataTest] = useState([]);
  const [pause, setPause] = useState(false);
  const [turn, setTurn] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Hàm lấy thời gian và gắn cho timer
  const getTimeDown = (data) => {
    setTimer(data);
  };

  // Hàm định dạng hh:mm:ss
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

  // fetch API
  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      await sleep(500);
      const responseJson = await fetch("http://localhost:5000/question");
      const response = await responseJson.json();
      setDataTest(response);
      setIsLoading(false);
    };
    fetchQuestion();
  }, []);

  // Hàm tăng lượt người làm bài và pause thời gian làm bài
  const turnExam = () => {
    setTurn(turn + 1);
    setPause(true);
  };

  // list context
  const listContext = {
    dataTest: dataTest,
    turnExam: turnExam,
    seconds_to: seconds_to,
    timer: timer,
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
      <mainLeftExam.Provider value={listContext}>
        <Oclock pause={pause} getTimeDown={getTimeDown} />
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="main__left-content">
            {dataTest.length > 0 && <Exam />}
          </div>
        )}
      </mainLeftExam.Provider>
    </div>
  );
}
