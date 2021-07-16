import React, { useContext } from "react";
import { mainExam } from "../Main/index";
import { examContainerContext } from "../Main/MainLeft/Exam";
import DialogCustom from "./DialogCustom";

export default function DialogWarning({ doneExam }) {
  // context
  const context = useContext(mainExam);
  const contextExam = useContext(examContainerContext);

  return (
    <>
      <DialogCustom
        dialogHeader={`Bạn còn ${
          context.dataTest.length - contextExam.selectedRadio.length
        } câu chưa trả lời !`}
        dialogClose={contextExam.onChangeConfirm}
        dialogContent="Bạn đồng ý nộp chƯ?"
        dialogOnClickSubmit={doneExam}
        dialogOnClickOther={contextExam.onChangeConfirm}
        dialogOnClickSubmitContent="Nộp bài"
        dialogOnClickOtherContent="Làm tiếp"
      />
    </>
  );
}
