import React, { useContext } from "react";
import Question from "./Question";
import Notify from "./Notify";
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
const useStyle = makeStyles({
  Button: {
    width: "100px",
    height: "28px",
    fontSize: "18px",
  },
  ButtonNav: {
    width: "60px",
  },
  checkbox: {
    color: "orange",
  },
});
export default function ExamContainer({
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
      {context.dataTest.map(
        (item, index) =>
          index === count && (
            <Question key={`question${item.id}`} dataItem={item} />
          )
      )}

      {openconfirm && <Notify />}
      {context.timeDown === 0 && <Notify />}

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
            {context.dataTest.map(
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
                        onChange={() => handleChangeChecked(item.id)}
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
              disabled={count < context.dataTest.length - 1 ? false : true}
            >
              <ArrowRightIcon />
            </Button>
            <Button
              className={clsx(classesBtn.Button, classes.ButtonNav)}
              size="small"
              onClick={handleFlagListQuestion}
            >
              <i className="fas fa-ellipsis-h"></i>
            </Button>
          </Box>
        </Box>
        {flagListQuestion && (
          <Box className="choose-question__list">
            {context.dataTest.map((item, index) => (
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
