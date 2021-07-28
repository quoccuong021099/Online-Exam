import Box from "@material-ui/core/Box";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getQuestion } from "../../redux/actions/question";
import MainLeft from "./MainLeft";
import MainRight from "./MainRight";
import "./style.scss";

export const mainExam = React.createContext();

function Main({ triggerListQuestion }) {
  // List state
  const [pause, setPause] = useState(false);
  const [timeDown, setTimeDown] = useState(0);
  // Hàm lấy thời gian đếm ngược và gắn cho timeDown
  const getTimeDown = (data) => {
    setTimeDown(data);
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
    triggerListQuestion();
  }, [triggerListQuestion]);

  // list context
  const listContext = {
    pauseTime: pauseTime,
    formatTime: formatTime,
    timeDown: timeDown,
    getTimeDown: getTimeDown,
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

const mapDispatchToProps = (dispatch) => {
  return {
    triggerListQuestion: () => dispatch(getQuestion()),
  };
};
export default connect(null, mapDispatchToProps)(Main);
