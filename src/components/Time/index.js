import React, { useState } from "react";

const Timer = ({
  initialHours = 0,
  initialMinutes = 45,
  initialSeconds = 0,
}) => {
  const [time, setTime] = useState({
    h: initialHours,
    m: initialMinutes,
    s: initialSeconds,
  });

  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    let myInterval = setInterval(() => {
      setTime((time) => {
        const updatedTime = { ...time };
        if (time.s > 0) {
          updatedTime.s--;
        }

        if (time.s === 0) {
          if (time.h === 0 && time.m === 0) {
            clearInterval(myInterval);
          } else if (time.m > 0) {
            updatedTime.m--;
            updatedTime.s = 59;
          } else if (updatedTime.h > 0) {
            updatedTime.h--;
            updatedTime.m = 59;
            updatedTime.s = 59;
          }
        }

        return updatedTime;
      });
    }, 1000);
    setTimer(myInterval);
  };

  const pauseTimer = () => {
    clearInterval(timer);
  };

  const cancelTimer = () => {
    clearInterval(timer);
    setTime({
      h: initialHours,
      m: initialMinutes,
      s: initialSeconds,
    });
  };

  console.log("timer", time);

  return (
    <div>
      <h1 className="timer">
        {/* {time.h < 10 && time.h !== 0
          ? `0${time.h}:`
          : time.h >= 10 && `${time.h}:`} */}
        {time.m < 10 ? `0${time.m}` : time.m}:
        {time.s < 10 ? `0${time.s}` : time.s}
      </h1>
      <button onClick={startTimer}>START</button>
      <button onClick={pauseTimer}>PAUSE</button>
      <button onClick={cancelTimer}>CANCEL</button>
    </div>
  );
};

export default Timer;
