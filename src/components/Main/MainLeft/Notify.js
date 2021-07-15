import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { mainExam } from "../index";
import { examContainerContext } from "./Exam";
export default function Notify() {
  
  // context
  const context = useContext(mainExam);
  const contextExam = useContext(examContainerContext);

  return (
    <>
      <Box className="overlay"></Box>
      <Box className="notify">
        {context.timeDown !== 0 ? (
          <>
            <Typography component="h1">
              Bạn còn{" "}
              {context.dataTest.length - contextExam.selectedRadio.length} câu
              chưa trả lời
            </Typography>
            <Typography component="p">
              Thời gian còn {context.formatTime(context.timeDown)}
            </Typography>
            <Typography component="p">Bạn đồng ý nộp bài chƯ?</Typography>
            <Box className="buttons">
              <Button
                type="submit"
                variant="contained"
                onClick={context.pauseTime}
              >
                Nộp bài
              </Button>
              <Button
                onClick={contextExam.onChangeConfirm}
                variant="contained"
                color="primary"
              >
                Làm tiếp
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box className="time-out">
              <Typography component="h1">
                Đã hết thời gian vui lòng nhấn nút nộp bài
              </Typography>
              <Button
                onClick={context.pauseTime}
                type="submit"
                value="Nộp bài"
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
