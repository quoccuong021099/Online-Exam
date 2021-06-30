import React from "react";
import MainRight from "./MainRight";
import MainLeft from "./MainLeft"
import "./style.scss";
export default function Main() {
  return (
    <main>
      <div className="main">
        <MainLeft />
        <MainRight />
      </div>
    </main>
  );
}
