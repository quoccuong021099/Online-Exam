import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { postChart } from "../../redux/actions/charts";
import { makeSelectChart } from "../../redux/selectors/chart";
import { makeSelectQuestion } from "../../redux/selectors/question";
import { mainExam } from "../Main";
import { examContainerContext } from "../Main/MainLeft/Exam";
import "../Main/MainLeft/style.scss";

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

function CustomizedDialogs({
  onOpenDone,
  yourResult,
  charts,
  triggerPostChart,
  listQuestion,
}) {
  const classes = useStyleDialog();
  // context
  const context = useContext(mainExam);
  const contextExam = useContext(examContainerContext);

  // state
  const [resultFinal, setResultFinal] = useState([]);

  // lấy user trong localStorage
  const user = JSON.parse(localStorage.getItem("user-info"));

  // hàm trả về đáp án đúng của bộ đề
  useEffect(() => {
    const result = [];
    listQuestion.map((item) =>
      item.answers.map((i) => i.result === true && result.push(i))
    );
    setResultFinal(result);
  }, [listQuestion]);

  // Tổng điểm
  const totalPoint = (10 / listQuestion.length) * yourResult.result_True;

  // POST dữ liệu charts lên API
  const getRank = async () => {
    triggerPostChart({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      point: totalPoint.toFixed(2),
      time: JSON.stringify(600 - context.timeDown),
    });
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
                {`${
                  i.parent_id.length > 10
                    ? i.parent_id.slice(-2)
                    : i.parent_id.slice(-1)
                } - 
                  ${i.content_answer.slice(0, 1)}`}
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

const mapStateToProps = createStructuredSelector({
  charts: makeSelectChart(),
  listQuestion: makeSelectQuestion(),
});
const mapDispatchToProps = (dispatch) => {
  return {
    triggerPostChart: (chartInfor) => dispatch(postChart(chartInfor)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomizedDialogs);
