import React, { useContext } from "react";
import Question from "./Question";
import Button from "@material-ui/core/Button";
import { useButton } from "../../../common/Btn";
import { mainExam } from "../index";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Checkbox from "@material-ui/core/Checkbox";
import DialogWarning from "../../Dialog/DialogWarning";
import DialogWarningTimeout from "../../Dialog/DialogWarningTimeout";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { createStructuredSelector } from "reselect";
import { makeSelectQuestion } from "../../../redux/selectors/question";
import { connect } from "react-redux";

const useStyle = makeStyles({
  Button: {
    width: "100px",
    height: "28px",
    fontSize: "18px",
  },
  ButtonNav: {
    width: "60px",
    "&:hover": {
      backgroundColor: "orange",
    },
  },
  checkbox: {
    color: "orange",
  },
});

function ExamContainer({
  listQuestion,
  flagListQuestion,
  handleFlagListQuestion,
  handleChangeChecked,
  onChangeConfirm,
  openconfirm,
  prevPagination,
  nextPagination,
  chooseQuestion,
  reviews,
  doneExam,
  count,
  activeAnswer,
}) {
  // classes
  const classes = useStyle();
  const classesBtn = useButton();

  // context
  let context = useContext(mainExam);

  return (
    <form onSubmit={doneExam}>
      {listQuestion.map(
        (item, index) =>
          index === count && (
            <Question key={`question${item.id}`} dataItem={item} />
          )
      )}

      {openconfirm && context.timeDown !== 0 && (
        <DialogWarning doneExam={doneExam} />
      )}
      {context.timeDown === 0 && <DialogWarningTimeout doneExam={doneExam} />}

      <Box className="choose-question">
        <Box className="choose-question__header">
          <Box className="review">
            <Button
              className={clsx(classesBtn.Button, classes.Button)}
              onClick={onChangeConfirm}
              size="small"
            >
              NỘP BÀI
            </Button>
            {listQuestion.map(
              (item, index) =>
                index === count && (
                  <FormControlLabel
                    key={item.id}
                    checked={reviews.includes(item.id)}
                    label="Xem Lại"
                    control={
                      <Checkbox
                        className={classes.checkbox}
                        id="review"
                        onChange={(e) => handleChangeChecked(item.id, e)}
                      />
                    }
                  />
                )
            )}
          </Box>
          <Box className="exam__pagination">
            <Button
              className={clsx(classesBtn.Button, classes.ButtonNav)}
              size="small"
              onClick={prevPagination}
              disabled={count > 0 ? false : true}
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              className={clsx(classesBtn.Button, classes.ButtonNav)}
              size="small"
              onClick={nextPagination}
              disabled={count < listQuestion.length - 1 ? false : true}
            >
              <ArrowRightIcon />
            </Button>
            <Button
              className={clsx(classesBtn.Button, classes.ButtonNav)}
              size="small"
              onClick={handleFlagListQuestion}
            >
              <MoreHorizIcon />
            </Button>
          </Box>
        </Box>
        {flagListQuestion && (
          <Box className="choose-question__list">
            {listQuestion.map((item, index) => (
              <Typography
                component="span"
                id={reviews.includes(item.id) ? "active" : ""}
                className={activeAnswer.includes(item.id) ? "active" : ""}
                key={index}
                onClick={() => chooseQuestion(index)}
              >
                {index + 1}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </form>
  );
}
const mapStateToProps = createStructuredSelector({
  listQuestion: makeSelectQuestion(),
});

export default connect(mapStateToProps, null)(ExamContainer);
