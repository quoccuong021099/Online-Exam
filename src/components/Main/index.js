import MainRight from "./MainRight";
import MainLeft from "./MainLeft";
import "./style.scss";
import React, { useEffect, useState } from "react";
export const mainExam = React.createContext();

export default function Main() {
  // List state
  const [dataTest, setDataTest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pause, setPause] = useState(false);
  const [turn, setTurn] = useState(0);
  const [timeDown, setTimeDown] = useState(0);

  // Hàm lấy thời gian đếm ngược và gắn cho timeDown
  const getTimeDown = (data) => {
    setTimeDown(data);
  };

  // hàm loading
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Hàm tăng lượt người làm bài và pause thời gian làm bài
  const turnExam = () => {
    setPause(true);
    setTurn(turn + 1);
  };

  // Hàm định dạng hh:mm:ss
  const formatTime = (sec) => {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "00");
    sec < 1 ? (sec = "00") : void 0;
    min.toString().length === 1 ? (min = "0" + min) : void 0;
    sec.toString().length === 1 ? (sec = "0" + sec) : void 0;
    return hours + ":" + min + ":" + sec;
  };

  // fetch API question
  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      await sleep(1000);
      const responseJson = await fetch("http://localhost:5000/question");
      const response = await responseJson.json();
      setDataTest(response);
      setIsLoading(false);
    };
    fetchQuestion();
  }, []);

  // list context
  const listContext = {
    dataTest: dataTest,
    turnExam: turnExam,
    formatTime: formatTime,
    timeDown: timeDown,
    getTimeDown: getTimeDown,
    isLoading: isLoading,
    pause: pause,
    turn: turn,
  };
  return (
    <mainExam.Provider value={listContext}>
      <main>
        <div className="main">
          <MainLeft />
          <MainRight />
        </div>
      </main>
    </mainExam.Provider>
  );
}
