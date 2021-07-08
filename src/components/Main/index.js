import MainRight from "./MainRight";
import MainLeft from "./MainLeft";
import "./style.scss";
import { useContext, useState } from "react";
import ChooseTopic from "./ChooseTopic";
import { contextApp } from "../../App";
import { useHistory } from "react-router";

export default function Main() {
  const context_app = useContext(contextApp);

  const history = useHistory();

  // state
  const [start, setStart] = useState(false);
  const user = localStorage.getItem("user-info");
  const handleStart = () => {
    if (user) {
      setStart(true);
    } else {
      history.push("/login");
    }
  };

  return (
    <main>
      <div className="main">
        {start ? <MainLeft /> : <ChooseTopic handleStart={handleStart} />}

        <MainRight />
      </div>
    </main>
  );
}
