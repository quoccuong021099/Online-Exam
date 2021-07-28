import React, { useContext } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectQuestion } from "../../redux/selectors/question";
import { examContainerContext } from "../Main/MainLeft/Exam";
import DialogCustom from "./DialogCustom";

function DialogWarning({ doneExam, listQuestion }) {
  // context
  const contextExam = useContext(examContainerContext);

  return (
    <>
      <DialogCustom
        dialogHeader={`Bạn còn ${
          listQuestion.length - contextExam.selectedRadio.length
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
const mapStateToProps = createStructuredSelector({
  listQuestion: makeSelectQuestion(),
});

export default connect(mapStateToProps, null)(DialogWarning);
