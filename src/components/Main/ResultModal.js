import React from "react";
export default function ResultModal({
  handleOpenModal,
  yourResult,
  selectedRadio,
  timeDown,
  seconds_to,
}) {
  const timer = timeDown;
  return (
    <>
      <div className="modal">
        <div className="overlay" onClick={handleOpenModal}></div>
        <div className="modal-result">
          <h1 className="modal-header">KẾT QUẢ</h1>
          <div className="modal-body">
            <div className="modal-body__title">
              <p>Thời Gian: {seconds_to(timer)}</p>
              <p>Số Câu đúng: {yourResult.result_True}</p>
              <p>Số Câu Sai: {yourResult.result_False}</p>
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
          </div>
          <div className="modal-footer">
            <a href="/#" onClick={handleOpenModal}>
              <i className="fas fa-angle-left"></i> Trở về
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
