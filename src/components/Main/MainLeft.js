import React from "react";
import Exam from "./Exam";
export default function MainLeft() {
  return (
    <div className="main__left">
      <div className="main__left-title">
        <h2>Đề thi thử THPT QG năm 2021 môn Toán</h2>
        <p>Trường THPT Yên Dũng số 2 lần 3</p>
      </div>
      <div className="main__left-desc">
        <div class="num-question">
          <span>
            <i class="fas fa-check-square" aria-hidden="true"></i>50 câu
          </span>
        </div>
        <div class="num-minutes">
          <span>
            <i class="fas fa-clock" aria-hidden="true"></i>
            90 phút
          </span>
        </div>
        <div class="num-attempt">
          <span>
            <i class="fa fa-user" aria-hidden="true"></i>0 lượt thi
          </span>
        </div>
      </div>
      <div className="main__left-content">
        <Exam />
        <div className="exam__footer">
          <button className="exam__footer-start">BẮT ĐẦU</button>
          <button className="exam__footer-share">CHIA SẺ FACEBOOK</button>
        </div>
      </div>
    </div>
  );
}
