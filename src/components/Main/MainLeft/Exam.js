import React, { useState } from "react";
import Question from "./Question";
import Button from "../../../common/Button";
import ResultModal from "./ResultModal";

export default function Exam({ dataTest, turnExam }) {
  const [selectedRadio, setSelectedRadio] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(0);
  const [yourResult, setYourResult] = useState({
    result_True: 0,
    result_False: 0,
  });
  const [flagListQuestion, setFlagListQuestion] = useState(false);

  const activeAnswer = selectedRadio.map((i) => i.parent_id);

  const handleFlagListQuestion = () => {
    setFlagListQuestion(!flagListQuestion);
  };

  const handleChange = (data) => {
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
  };

  const handleOpenModal = () => {
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
  return (
    <div>
      <a href="/#" className="main__left-alarm">
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M19.004 1c-.947 0-1.895.268-2.719.803 3.17 1.218 5.694 3.739 6.914 6.909.534-.823.801-1.77.801-2.717 0-2.761-2.236-4.995-4.996-4.995m-7.004 20c-4.411 0-8.001-3.59-8.001-8 0-4.413 3.59-8.001 8.001-8.001 4.412 0 8.002 3.588 8.002 8.001 0 4.41-3.59 8-8.002 8m10.002-8c0-5.522-4.475-10.001-10.002-10.001-5.523 0-10.001 4.479-10.001 10.001 0 4.316 3.087 10 10.001 10 6.93 0 10.002-5.693 10.002-10m-21.199-4.285c-.535-.824-.802-1.772-.802-2.718 0-2.757 2.233-4.995 4.991-4.995.948 0 1.896.268 2.721.803-3.172 1.217-5.692 3.739-6.91 6.91m12.196 4.285v-5h-1.999v6.998h5.999v-1.998h-4z" />
        </svg>
        <span>00:00</span>
      </a>
      {openModal && (
        <ResultModal
          handleOpenModal={handleOpenModal}
          yourResult={yourResult}
          selectedRadio={selectedRadio}
          dataTest={dataTest}
        />
      )}

      <form onSubmit={doneExam}>
        {dataTest.map(
          (item, index) =>
            index === count && (
              <Question
                key={`question${item.id}`}
                dataItem={item}
                handleChange={handleChange}
                selectedRadio={selectedRadio}
              />
            )
        )}

        <div className="choose-question">
          <div className="choose-question__header">
            <div onClick={turnExam}>
              <Button
                className="exam__pagination-submit"
                value="NỘP BÀI"
                type="submit"
              />
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
    </div>
  );
}
