import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { mainExam } from "../Main";
import { examContainerContext } from "../Main/MainLeft/Exam";
import { useContext, useEffect, useState } from "react";
import { contextApp } from "../../App";
import "../Main/MainLeft/style.scss";
import axios from "axios";

const useStyleDialog = makeStyles(() => ({
  titleRusult: {
    background: "#3f51b5",
    color: "#fff",
    padding: "10px 0",
  },
  containerStatistical: {
    display: "flex",
    padding: "10px 0",
  },
  textStatistical: {
    margin: "0 20px",
  },

  listResult: {
    borderTop: "1px solid #cfcfe9",
    padding: "20px",
  },
  tableResult: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "15px 0",
    // width: "100%",
  },
  itemTableResult: {
    width: "10%",
    border: "1px solid #cfcfe9",
    padding: "5px 7px",
  },

  correct: {
    backgroundColor: "rgb(175, 252, 124)",
  },
  wrong: {
    backgroundColor: "rgb(251, 102, 102)",
  },
}));

export default function CustomizedDialogs({ onOpenDone, yourResult }) {
  const classes = useStyleDialog();

  // context
  const context = useContext(mainExam);
  const contextExam = useContext(examContainerContext);
  const appContext = useContext(contextApp);

  // state
  const [resultFinal, setResultFinal] = useState([]);

  // lấy user trong localStorage
  const user = JSON.parse(localStorage.getItem("user-info"));

  // hàm trả về đáp án đúng của bộ đề
  useEffect(() => {
    const result = [];
    context.dataTest.map((item) =>
      item.answers.map((i) => i.result === true && result.push(i))
    );
    setResultFinal(result);
  }, [context.dataTest]);

  // Tổng điểm
  const totalPoint = (10 / context.dataTest.length) * yourResult.result_True;

  // POST dữ liệu charts lên API
  const getRank = async () => {
    const sortUpUser = appContext.charts.find((i) => i.id === user.id);
    console.log(sortUpUser);
    if (!sortUpUser) {
      let data = {
        id: user.id,
        lastname: user.lastname,
        firstname: user.firstname,
        point: totalPoint.toFixed(2),
        time: JSON.stringify(600 - context.timeDown),
      };
      try {
        axios
          .post("http://localhost:5000/charts", data)
          .then(function (response) {
            localStorage.setItem("charts", JSON.stringify(response.data));
            appContext.reset(response.data);
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      if (
        JSON.parse(sortUpUser.point) < totalPoint.toFixed(2) ||
        (JSON.parse(sortUpUser.point) < totalPoint.toFixed(2) &&
          sortUpUser.time >= 600 - context.timeDown)
      ) {
        sortUpUser.lastname = user.lastname;
        sortUpUser.firstname = user.firstname;
        sortUpUser.point = totalPoint.toFixed(2);
        sortUpUser.time = JSON.stringify(600 - context.timeDown);
        try {
          axios
            .patch(`http://localhost:5000/charts/${sortUpUser.id}`, sortUpUser)
            .then(function (response) {
              localStorage.setItem("charts", JSON.stringify(response.data));
              appContext.reset(sortUpUser);
            });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <Dialog open onClose={onOpenDone}>
      <Box>
        <Typography
          className={classes.titleRusult}
          component="h6"
          variant="h6"
          align="center"
        >
          KẾT QUẢ
        </Typography>
        <Box className={classes.containerStatistical}>
          <Typography className={classes.textStatistical} component="p">
            Thời gian: {context.formatTime(600 - context.timeDown).slice(-5)}
          </Typography>
          <Typography className={classes.textStatistical} component="p">
            Tổng điểm:
            {totalPoint.toFixed(2)}
          </Typography>
          <Typography className={classes.textStatistical} component="p">
            Số câu đúng: {yourResult.result_True}
          </Typography>
          <Typography className={classes.textStatistical} component="p">
            Số câu sai: {yourResult.result_False}
          </Typography>
        </Box>

        <Box className={classes.listResult}>
          <Typography align="center" component="p">
            Đáp án của bạn
          </Typography>
          <div className={classes.tableResult}>
            {contextExam.selectedRadio.map((i, index) => (
              <span key={index} className={classes.itemTableResult}>
                {i.result
                  ? `${i.parent_id.slice(-1)} - Đ`
                  : `${i.parent_id.slice(-1)} - S`}
              </span>
            ))}
          </div>
        </Box>

        <Box className={classes.listResult}>
          <Typography align="center" component="p">
            Đáp án đúng
          </Typography>
          <div className={classes.tableResult}>
            {resultFinal.map((item, index) => (
              <span key={index} className={classes.itemTableResult}>
                {`${index + 1} - ${item.content_answer.slice(0, 1)}`}
              </span>
            ))}
          </div>
        </Box>

        <Box
          style={{ border: "1px solid #cfcfe9" }}
          className={classes.tableResult}
          onClick={getRank}
        >
          <Button variant="contained" onClick={onOpenDone} color="primary">
            Xong
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
