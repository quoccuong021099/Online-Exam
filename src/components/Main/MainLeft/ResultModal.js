import React, { useEffect, useState } from "react";
export default function ResultModal({
  handleOpenModal,
  yourResult,
  selectedRadio,
  timeDown,
  seconds_to,
  dataTest,
}) {
  const timer = timeDown;
  const [resultFinal, setResultFinal] = useState([]);

  useEffect(() => {
    const result = [];
    dataTest.map((item) =>
      item.answers.map((i) => i.result === true && result.push(i))
    );
    setResultFinal(result);
  }, [dataTest]);
  return (
    <>
      <div className="modal">
        <div className="overlay" onClick={handleOpenModal}></div>
        <div className="modal-result">
          <h1 className="modal-header">KẾT QUẢ</h1>
          <div className="modal-body">
            <div className="modal-body__title">
              <p>Thời gian: {seconds_to(600 - timer)}</p>
              <p>Số câu đúng: {yourResult.result_True}</p>
              <p>Số câu Sai: {yourResult.result_False}</p>
            </div>
            <div className="modal-body__table">
              <h2>Đáp án của bạn</h2>
              <div className="modal-body__table-result">
                {selectedRadio.map((item, index) => (
                  <span key={index}>
                    {item.result ? `${index + 1} - Đ` : `${index + 1} - S`}
                  </span>
                ))}
              </div>
            </div>
            <div className="modal-body__table">
              <h2>Đáp án đúng</h2>
              <div className="modal-body__table-result">
                {resultFinal.map((item, index) => (
                  <span key={index}>
                    {item.content_answer.length <= 4
                      ? `${index + 1} - ${item.content_answer}`.slice(0, -3)
                      : `${index + 1} - ${item.content_answer}`.slice(0, -4)}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a href="/#" onClick={handleOpenModal}>
              <i className="fas fa-angle-left"></i> Quay lại
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
