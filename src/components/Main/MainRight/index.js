import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { useContext, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useButton } from "../../../common/Btn";
import { makeSelectChart } from "../../../redux/selectors/chart";
import { mainExam } from "../index";
import RatingItem from "./RatingItem";
import "./style.scss";

const useStyle = makeStyles({
  Button: {
    width: "100px",
    fontSize: "14px",
    margin: "0 auto",
    display: "block",
  },
});

function MainRight({ charts }) {
  console.log(charts);
  // material
  const classes = useStyle();
  const classesBtn = useButton();

  // context
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

  const descendingSort = charts
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
const mapStateToProps = createStructuredSelector({
  charts: makeSelectChart(),
});

export default connect(mapStateToProps, null)(MainRight);
