import "./style.scss";
import { contextApp } from "../../../App";
import { mainExam } from "../index";
import { useContext, useState } from "react";
import RatingItem from "./RatingItem";
export default function MainRight() {
  const appContext = useContext(contextApp);
  const mainExamContext = useContext(mainExam);
  // list state
  const [number, setNumber] = useState(3);

  // hàm xem thêm
  const handleSeeMore = () => {
    setNumber(10);
  };

  // hàm ẩn bớt
  const handleHideNumber = () => {
    setNumber(3);
  };

  const descendingSort = appContext.charts
    ?.sort((a, b) => Number(a.time) - Number(b.time))
    .sort((a, b) => b.point - a.point);

  return (
    <div className="main__right">
      <div className="empty"></div>
      <div className="cart__group">
        <div className="cart__group-header">
          <h2>Top 3/{appContext.charts?.length} lượt thi</h2>
        </div>
        <ul className="cart__group-body">
          <li className="cart__group-item">
            <ul className="cart__group-item-title">
              <li>Tên</li>
              <li>Điểm</li>
              <li>Thời gian</li>
            </ul>
          </li>
          {descendingSort?.map(
            (item, index) =>
              index < number && (
                <RatingItem
                  key={item.id}
                  name={`${item.firstname} ${item.lastname}`}
                  point={item.point}
                  time={mainExamContext.formatTime(item.time).slice(-5)}
                />
              )
          )}
        </ul>

        {number < 10 && (
          <div className="cart__group-footer">
            <button onClick={handleSeeMore}>Xem thêm</button>
          </div>
        )}
        {number >= 10 && (
          <div className="cart__group-footer">
            <button onClick={handleHideNumber}>Ẩn bớt</button>
          </div>
        )}
      </div>
    </div>
  );
}
