import MainRight from "./MainRight/MainRight";
import MainLeft from "./MainLeft/MainLeft";
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
