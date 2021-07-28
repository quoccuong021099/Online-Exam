import React, { useContext } from "react";
// import { mainExam } from "../Main/index";
import { examContainerContext } from "../Main/MainLeft/Exam";
import DialogCustom from "./DialogCustom";

export default function DialogWarningTimeout({ doneExam }) {
  // context
  const contextExam = useContext(examContainerContext);

  return (
    <>
      <DialogCustom
        dialogHeader={`Hết thời gian làm bài!`}
        dialogClose={contextExam.onChangeConfirm}
        dialogContent="Vui lòng nhất nút nộp bài!! "
        dialogOnClickSubmit={doneExam}
        dialogOnClickOther={contextExam.onChangeConfirm}
        dialogOnClickSubmitContent="Nộp bài"
      />
    </>
  );
}
