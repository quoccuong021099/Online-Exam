import "./style.scss";
import { contextApp } from "../../../App";
import { mainExam } from "../index";
import { useContext, useState } from "react";
import RatingItem from "./RatingItem";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { useButton } from "../../../common/Btn";
const useStyle = makeStyles({
  Button: {
    width: "100px",
    fontSize: "14px",
    margin: "0 auto",
    display: "block",
  },
});

export default function MainRight() {
  // material
  const classes = useStyle();
  const classesBtn = useButton();

  // context
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
    <Box className="main__right">
      <Box className="empty"></Box>
      <Box className="cart__group">
        <Box className="cart__group-header">
          <Typography component="h2">Top 3</Typography>
        </Box>
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
          <Box width="100%" paddingBottom="15px">
            <Button
              className={clsx(classesBtn.Button, classes.Button)}
              onClick={handleSeeMore}
            >
              Xem thêm
            </Button>
          </Box>
        )}
        {number >= 10 && (
          <Box width="100%" paddingBottom="15px">
            <Button
              className={clsx(classes.Button, classesBtn.Button)}
              onClick={handleHideNumber}
            >
              Ẩn bớt
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
