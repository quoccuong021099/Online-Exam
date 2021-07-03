import React, { useEffect, useState } from "react";
import Exam from "./Exam";
import Done from "./Done";
export default function MainLeft({ doStart }) {
  const [dataTest, setDataTest] = useState([]);
  const [timeDown, setTimeDown] = useState(600);
  const [turn, setTurn] = useState(0);
  const [flag, setFlag] = useState(false);

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
    const timeInterval = setInterval(() => {
      const timer = timeDown;
      if (timer > 0) setTimeDown(timer - 1);
    }, 1000);
    if (flag) clearInterval(timeInterval);

    return () => {
      clearInterval(timeInterval);
    };
  }, [timeDown, flag]);

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
    setFlag(true);
  };

  return (
    <div className="main__left">
      <a href="/#" className="main__left-alarm">
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M19.004 1c-.947 0-1.895.268-2.719.803 3.17 1.218 5.694 3.739 6.914 6.909.534-.823.801-1.77.801-2.717 0-2.761-2.236-4.995-4.996-4.995m-7.004 20c-4.411 0-8.001-3.59-8.001-8 0-4.413 3.59-8.001 8.001-8.001 4.412 0 8.002 3.588 8.002 8.001 0 4.41-3.59 8-8.002 8m10.002-8c0-5.522-4.475-10.001-10.002-10.001-5.523 0-10.001 4.479-10.001 10.001 0 4.316 3.087 10 10.001 10 6.93 0 10.002-5.693 10.002-10m-21.199-4.285c-.535-.824-.802-1.772-.802-2.718 0-2.757 2.233-4.995 4.991-4.995.948 0 1.896.268 2.721.803-3.172 1.217-5.692 3.739-6.91 6.91m12.196 4.285v-5h-1.999v6.998h5.999v-1.998h-4z" />
        </svg>
        <span>{seconds_to(timeDown)}</span>
      </a>
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
            seconds_to={seconds_to}
            timeDown={timeDown}
            turnExam={turnExam}
            doStart={doStart}
          />
        )}
      </div>
    </div>
  );
}
