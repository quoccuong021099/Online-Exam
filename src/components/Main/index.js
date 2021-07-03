import React, { useState } from "react";
import MainRight from "./MainRight/MainRight";
import MainLeft from "./MainLeft/MainLeft";
import ChooseTopic from "./ChooseTopic/ChooseTopic";
import "./style.scss";
export default function Main() {
  const [start, setStart] = useState(false);

  const doStart = () => {
    setStart(!start);
  };

  return (
    <main>
      <div className="main">
        {start ? <MainLeft doStart={doStart}/> : <ChooseTopic doStart={doStart} />}

        <MainRight />
      </div>
    </main>
  );
}
