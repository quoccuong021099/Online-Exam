import MainRight from "./MainRight";
import MainLeft from "./MainLeft";
import "./style.scss";
import { useState } from "react";
import ChooseTopic from "./ChooseTopic";
export default function Main() {
  // state
  const [start, setStart] = useState(false);

  const handleStart = () => {
    setStart(true);
  };

  return (
    <main>
      <div className="main">
        {start ? <MainLeft /> : <ChooseTopic handleStart={handleStart}/>}

        <MainRight />
      </div>
    </main>
  );
}
