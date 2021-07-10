import React, { useContext } from "react";
import Exam from "./Exam";
import Oclock from "../../Oclock";
import "./style.scss";
import Spinner from "../../Spinner";
import { mainExam } from "../index";
export default function MainLeft() {
  const mainExamContext = useContext(mainExam);

  return (
    <div className="main__left">
      <div className="main__left-title">
        <div className="left">
          <h2>Đề thi thử THPT QG năm 2021 môn Toán</h2>
          <p>Trường THPT Yên Dũng số 2 lần 3</p>
        </div>
      </div>
      <div className="main__left-desc">
        <div className="num-question">
          <span>
            <i className="fas fa-check-square" aria-hidden="true"></i>20 câu
          </span>
        </div>
        <div className="num-minutes">
          <span>
            <i className="fas fa-clock" aria-hidden="true"></i>
            10 phút
          </span>
        </div>
        <div className="num-attempt">
          <span>
            <i className="fa fa-user" aria-hidden="true"></i>
            {mainExamContext.turn} lượt thi
          </span>
        </div>
      </div>

      <Oclock />
      {mainExamContext.isLoading ? (
        <Spinner />
      ) : (
        <div className="main__left-content">
          {mainExamContext.dataTest.length > 0 && <Exam />}
        </div>
      )}
    </div>
  );
}
