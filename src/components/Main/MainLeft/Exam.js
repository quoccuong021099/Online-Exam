import React, { useState } from "react";
import Question from "./Question";
import Button from "../../../common/Button";
import ResultModal from "./ResultModal";
import Notify from "./Notify";
import Done from "./Done";

export default function Exam({ dataTest, turnExam, timer, seconds_to }) {
  const [selectedRadio, setSelectedRadio] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openconfirm, setOpenconfirm] = useState(false);
  const [openDone, setOpenDone] = useState(false);
  const [count, setCount] = useState(0);
  const [yourResult, setYourResult] = useState({
    result_True: 0,
    result_False: 0,
  });
  const [flagListQuestion, setFlagListQuestion] = useState(false);
  const [reviews, setReviews] = useState([]);

  const activeAnswer = selectedRadio.map((i) => i.parent_id);

  const handleFlagListQuestion = () => {
    setFlagListQuestion(!flagListQuestion);
  };

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
      if (count < dataTest.length - 1) {
        const a = count + 1;
        setCount(a);
      } else return;
    }, 500);
  };

  const doneExam = (e) => {
    e.preventDefault();
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
  const onChangeConfirm = () => {
    setOpenconfirm(!openconfirm);
  };
  const onContinue = () => {
    setOpenconfirm(!openconfirm);
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const onOpenDone = () => {
    setOpenDone(!openDone);
    setOpenModal(!openModal);
  };

  const nextPagination = () => {
    if (count < dataTest.length) {
      const a = count + 1;
      setCount(a);
    }
  };
  const prevPagination = () => {
    if (count > 0 || count < dataTest.length) {
      const a = count - 1;
      setCount(a);
    } else {
      return;
    }
  };
  const chooseQuestion = (data) => {
    setCount(data);
  };

  const handleChangeChecked = (id) => {
    let a = document.querySelector("#review");
    if (a.checked) {
      setReviews([...reviews, id]);
    } else {
      reviews.splice(reviews.indexOf(id), 1);
      setReviews([...reviews]);
    }
  };
  return (
    <div>
      {openModal && (
        <ResultModal
          handleOpenModal={handleOpenModal}
          yourResult={yourResult}
          selectedRadio={selectedRadio}
          dataTest={dataTest}
          timer={timer}
          seconds_to={seconds_to}
          onOpenDone={onOpenDone}
        />
      )}
      {openDone ? (
        <Done />
      ) : (
        <form onSubmit={doneExam}>
          {dataTest.map(
            (item, index) =>
              index === count && (
                <Question
                  key={`question${item.id}`}
                  dataItem={item}
                  handleChangeResult={handleChangeResult}
                  selectedRadio={selectedRadio}
                />
              )
          )}

          {openconfirm && (
            <Notify
              onContinue={onContinue}
              turnExam={turnExam}
              timer={timer}
              seconds_to={seconds_to}
            />
          )}

          <div className="choose-question">
            <div className="choose-question__header">
              <div className="review">
                <Button
                  className="exam__pagination-submit"
                  value="NỘP BÀI"
                  type="button"
                  onClick={onChangeConfirm}
                />

                {dataTest.map(
                  (item, index) =>
                    index === count && (
                      <label htmlFor="review" key={index}>
                        <input
                          type="checkbox"
                          id="review"
                          defaultChecked={reviews.includes(item.id)}
                          onChange={() => handleChangeChecked(item.id)}
                        />
                        <span>Xem Lại</span>
                      </label>
                    )
                )}
              </div>
              <div className="exam__pagination">
                <Button
                  className="exam__pagination-prev"
                  value={<i className="fas fa-arrow-left"></i>}
                  type="button"
                  onClick={prevPagination}
                  disabled={count > 0 ? false : true}
                />
                <Button
                  className="exam__pagination-next"
                  type="button"
                  value={<i className="fas fa-arrow-right"></i>}
                  onClick={nextPagination}
                  disabled={count < dataTest.length - 1 ? false : true}
                />
                <Button
                  className="exam__pagination-list"
                  type="button"
                  value={<i className="fas fa-ellipsis-h"></i>}
                  onClick={handleFlagListQuestion}
                />
              </div>
            </div>
            {flagListQuestion && (
              <div className="choose-question__list">
                {dataTest.map((item, index) => (
                  <span
                    id={reviews.includes(item.id) ? "active" : ""}
                    className={activeAnswer.includes(item.id) ? "active" : ""}
                    key={index}
                    onClick={() => chooseQuestion(index)}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
