import "./style.scss";
import { contextApp } from "../../../App";
import { useContext, useEffect, useState } from "react";
import RatingItem from "./RatingItem";
export default function MainRight() {
  const AppContext = useContext(contextApp);
  const user = JSON.parse(localStorage.getItem("user-info"));

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

  // useEffect(() => {
  // data.id = v4();
  // let result = await fetch("http://localhost:5000/users", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // });
  // const userNow = AppContext.listUsers.find(
  //   (i) => i.username === user.username
  // );
  // userNow.point = 8;
  // userNow.time = 320;
  // console.log(user);
  // }, []);

  // data.id = v4();
  // let result = await fetch("http://localhost:5000/users", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // });
  // result = await result.json();
  // localStorage.setItem("user-info", JSON.stringify(result));
  // contextOfApp.reset(data);
  // history.push("/");
  return (
    <div className="main__right">
      <div className="empty"></div>
      <div className="cart__group">
        <div className="cart__group-header">
          <h2>Top 10/188 lượt thi</h2>
        </div>
        <ul className="cart__group-body">
          <li className="cart__group-item">
            <ul className="cart__group-item-title">
              <li>Tên</li>
              <li>Điểm</li>
              <li>Thời gian</li>
            </ul>
          </li>
          {AppContext.listUsers.map(
            (item, index) =>
              index < number && (
                <RatingItem
                  key={item.id}
                  name={`${item.firstname} ${item.lastname}`}
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
