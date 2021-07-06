import React, { useEffect, useState } from "react";
export default function ResultModal({
  handleOpenModal,
  yourResult,
  selectedRadio,
  dataTest,
  timer,
  seconds_to,
}) {
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
              <p>
                Tổng điểm:{" "}
                {((10 / dataTest.length) * yourResult.result_True).toFixed(2)}{" "}
                điểm
              </p>
              <p>Số câu đúng: {yourResult.result_True}</p>
              <p>Số câu Sai: {yourResult.result_False}</p>
            </div>
            <div className="modal-body__table">
              <h2>Đáp án của bạn</h2>
              <div className="modal-body__table-result">
                {selectedRadio.map(
                  (i, index) => (
                    // selectedRadio.map((i) => (
                    <span key={index}>
                      {i.result
                        ? `${i.parent_id.slice(-1)} - Đ`
                        : `${i.parent_id.slice(-1)} - S`}
                    </span>
                  )
                  // ))
                )}
                <br />
              </div>
            </div>
            <div className="modal-body__table">
              <h2>Đáp án đúng</h2>
              <div className="modal-body__table-result">
                {resultFinal.map((item, index) => (
                  <span key={index}>
                    {`${index + 1} - ${item.content_answer.slice(0, 1)}`}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a href="/#" onClick={handleOpenModal}>
              <i className="fas fa-angle-left"></i> Kết Thúc
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
