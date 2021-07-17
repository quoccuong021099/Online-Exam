import MainRight from "./MainRight";
import MainLeft from "./MainLeft";
import "./style.scss";
import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";

export const mainExam = React.createContext();

export default function Main() {
  // List state
  const [dataTest, setDataTest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pause, setPause] = useState(false);
  const [timeDown, setTimeDown] = useState(0);
  // Hàm lấy thời gian đếm ngược và gắn cho timeDown
  const getTimeDown = (data) => {
    setTimeDown(data);
  };

  // hàm loading
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Hàm pause thời gian làm bài
  const pauseTime = () => {
    setPause(true);
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
      await sleep(500);
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
    pauseTime: pauseTime,
    formatTime: formatTime,
    timeDown: timeDown,
    getTimeDown: getTimeDown,
    isLoading: isLoading,
    pause: pause,
  };
  return (
    <mainExam.Provider value={listContext}>
      <main>
        <Box className="main">
          <MainLeft />
          <MainRight />
        </Box>
      </main>
    </mainExam.Provider>
  );
}
