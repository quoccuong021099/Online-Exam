import React, { useContext } from "react";
import Question from "./Question";
import Notify from "./Notify";
import Button from "../../../common/Button";
import { mainExam } from "../index";
import InputWithLabel from "../../../common/InputWithLabel";
export default function ExamContainer({
  flagListQuestion,
  handleFlagListQuestion,
  handleChangeChecked,
  onChangeConfirm,
  openconfirm,
  prevPagination,
  nextPagination,
  chooseQuestion,
  reviews,
  doneExam,
  count,
  activeAnswer,
}) {
  // context
  let context = useContext(mainExam);

  return (
    <form onSubmit={doneExam}>
      {context.dataTest.map(
        (item, index) =>
          index === count && (
            <Question key={`question${item.id}`} dataItem={item} />
          )
      )}

      {openconfirm && <Notify />}
      {context.timeDown === 0 && <Notify />}

      <div className="choose-question">
        <div className="choose-question__header">
          <div className="review">
            <Button
              className="exam__pagination-submit"
              value="NỘP BÀI"
              type="button"
              onClick={onChangeConfirm}
            />

            {context.dataTest.map(
              (item, index) =>
                index === count && (
                  <InputWithLabel
                    htmlFor="review"
                    key={index}
                    type="checkbox"
                    idInput="review"
                    defaultChecked={reviews.includes(item.id)}
                    onChangeInput={() => handleChangeChecked(item.id)}
                    spanText="Xem Lại"
                  />
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
              disabled={count < context.dataTest.length - 1 ? false : true}
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
            {context.dataTest.map((item, index) => (
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
  );
}
