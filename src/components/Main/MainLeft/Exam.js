import React, { useState } from "react";
import Question from "./Question";
import Button from "../../../common/Button";
import ResultModal from "./ResultModal";

export default function Exam({
  dataTest,
  timeDown,
  seconds_to,
  turnExam,
  doStart,
}) {
  const [selectedRadio, setSelectedRadio] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [yourResult, setYourResult] = useState({
    result_True: 0,
    result_False: 0,
  });

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

  return (
    <div>
      {openModal && (
        <ResultModal
          handleOpenModal={handleOpenModal}
          yourResult={yourResult}
          selectedRadio={selectedRadio}
          timeDown={timeDown}
          seconds_to={seconds_to}
          dataTest={dataTest}
        />
      )}

      <form onSubmit={doneExam}>
        {dataTest.map((item) => (
          <Question
            key={`question${item.id}`}
            dataItem={item}
            handleChange={handleChange}
          />
        ))}
        <div className="exam__pagination">
          <Button
            className="exam__pagination-prev"
            value="TRỞ VỀ"
            onClick={doStart}
          />
          <div onClick={turnExam}>
            <Button
              className="exam__pagination-submit"
              value="NỘP BÀI"
              type="submit"
            />
          </div>
          {/* <Button
            className="exam__pagination-next"
            value={<i className="fas fa-arrow-right"></i>}
          /> */}
        </div>
      </form>
    </div>
  );
}
