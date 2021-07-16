import React, { useContext, useState } from "react";
import Done from "./Done";
import ExamContainer from "./ExamContainer";
import { mainExam } from "../index";
import DialogResult from "../../Dialog/DialogResult";

export const examContainerContext = React.createContext();

export default function Exam() {
  // Get context
  let context = useContext(mainExam);

  // Local state
  const [selectedRadio, setSelectedRadio] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openconfirm, setOpenconfirm] = useState(false);
  const [openDone, setOpenDone] = useState(false);
  const [count, setCount] = useState(0);
  const [flagListQuestion, setFlagListQuestion] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [yourResult, setYourResult] = useState({
    result_True: 0,
    result_False: 0,
  });

  // Mảng chứa những parent_id đã được chọn
  const activeAnswer = selectedRadio.map((i) => i.parent_id);

  // Hàm thay đổi cờ list question dùng để list các số câu hỏi ở control panel
  const handleFlagListQuestion = () => {
    setFlagListQuestion(!flagListQuestion);
  };

  // Hàm push những đáp án mà người dùng chọn
  const handleChangeResult = (data) => {
    if (selectedRadio.length > 0) {
      const index = selectedRadio.findIndex(
        (item) => item.parent_id === data.parent_id
      );
      if (index >= 0) {
        selectedRadio[index] = data;
        setSelectedRadio([...selectedRadio]);
      } else {
        setSelectedRadio([...selectedRadio, data]);
      }
    } else {
      setSelectedRadio([...selectedRadio, data]);
    }
    setTimeout(() => {
      if (count < context.dataTest.length - 1) {
        const a = count + 1;
        setCount(a);
      } else return;
    }, 200);
  };

  // Hàm khi được nộp bài
  const doneExam = (e) => {
    e.preventDefault();
    context.pauseTime();
    const newArr = selectedRadio;
    let resultTrue = 0;
    let resultFalse = 0;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].result === false) ++resultFalse;
      else ++resultTrue;
    }
    setYourResult({ result_True: resultTrue, result_False: resultFalse });
    setOpenModal(!openModal);
    setOpenconfirm(!openconfirm);
  };

  // hàm đóng mở xác nhận nộp bài
  const onChangeConfirm = () => {
    setOpenconfirm(!openconfirm);
  };

  // hàm mở cửa sổ kết thúc bài làm sau khi nhận được kết quả
  const onOpenDone = () => {
    setOpenDone(!openDone);
    setOpenModal(!openModal);
  };

  // hàm chuyển trang
  const nextPagination = () => {
    if (count < context.dataTest.length) {
      setCount((count) => count + 1);
    }
  };

  // hàm chuyển trang
  const prevPagination = () => {
    if (count <= 0 || count > context.dataTest.length) {
      return;
    } else {
      setCount((count) => count - 1);
    }
  };

  // hàm chọn câu hỏi ở control panel
  const chooseQuestion = (data) => {
    setCount(data);
  };

  // hàm 'xem lại'
  const handleChangeChecked = (id, e) => {
    if (e.target.checked) {
      setReviews([...reviews, id]);
    } else {
      reviews.splice(reviews.indexOf(id), 1);
      setReviews([...reviews]);
    }
  };

  // list context exam
  const listContextExam = {
    selectedRadio: selectedRadio,
    handleChangeResult: handleChangeResult,
    onChangeConfirm: onChangeConfirm,
  };

  return (
    <>
      <examContainerContext.Provider value={listContextExam}>
        {openModal && (
          <DialogResult yourResult={yourResult} onOpenDone={onOpenDone} />
        )}
        {openDone ? (
          <Done />
        ) : (
          <ExamContainer
            nextPagination={nextPagination}
            chooseQuestion={chooseQuestion}
            handleFlagListQuestion={handleFlagListQuestion}
            prevPagination={prevPagination}
            handleChangeChecked={handleChangeChecked}
            reviews={reviews}
            onChangeConfirm={onChangeConfirm}
            openconfirm={openconfirm}
            doneExam={doneExam}
            count={count}
            activeAnswer={activeAnswer}
            flagListQuestion={flagListQuestion}
          />
        )}
      </examContainerContext.Provider>
    </>
  );
}
