import React from "react";
import 
export default function ControlPanel({selectedRadio,handleChangeResult,doneExam,dataTest,}) {
  return (
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
  );
}
