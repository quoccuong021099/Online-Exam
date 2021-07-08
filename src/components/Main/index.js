import React from "react";
import MainRight from "./MainRight";
import MainLeft from "./MainLeft";
import Time from "../Time";
import "./style.scss";
export default function Main() {
  return (
    <main>
      <div className="main">
        <Time />
        <MainLeft />
        <MainRight />
      </div>
    </main>
  );
}
