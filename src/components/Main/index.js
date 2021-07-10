import MainRight from "./MainRight";
import MainLeft from "./MainLeft";
import "./style.scss";
import React, { useEffect, useState } from "react";
export const mainExam = React.createContext();

export default function Main() {
  // List state
  const [dataTest, setDataTest] = useState([]);
  // const [start, setStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pause, setPause] = useState(false);
  const [turn, setTurn] = useState(0);
  const [timer, setTimer] = useState(0);
  const [rank, setRank] = useState([]);

  // Hàm lấy thời gian và gắn cho timer

  const getTimeDown = (data) => {
    setTimer(data);
  };

  // hàm loading
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Hàm tăng lượt người làm bài và pause thời gian làm bài
  const turnExam = () => {
    setTurn(turn + 1);
    setPause(true);
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
      await sleep(1000);
      const responseJson = await fetch("http://localhost:5000/question");
      const response = await responseJson.json();
      setDataTest(response);
      setIsLoading(false);
    };
    fetchQuestion();
  }, []);

  // get rank
  const getResult = (time, point) => {
    setRank([...rank, { time: time, point: point }]);
    localStorage.setItem(
      "rank",
      JSON.stringify([...rank, { time: time, point: point }])
    );
  };

  // list context
  const listContext = {
    dataTest: dataTest,
    turnExam: turnExam,
    seconds_to: seconds_to,
    timer: timer,
    getTimeDown: getTimeDown,
    isLoading: isLoading,
    pause: pause,
    turn: turn,
    rank: rank,
    getResult: getResult,
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
