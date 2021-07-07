import React from "react";
import "./style.scss";
import Button from "../../../common/Button";

export default function ChooseTopic({ handleStart }) {
  const onChange = () => {};
  return (
    <div className="choose-topic">
      <h2 className="choose-topic_title">Đề Trắc Nghiệm Lớp 6</h2>
      <div className="choose-topic__step1">
        <h3 className="choose-topic__step1-title">B1: Chọn lớp và môn</h3>
        <div className="choose-topic__step1-select">
          <select
            name="class"
            id="class"
            className="choose-step1"
            value="6"
            onChange={onChange}
          >
            <option value="6">Lớp 6</option>
            <option value="7">Lớp 7</option>
            <option value="8">Lớp 8</option>
            <option value="9">Lớp 9</option>
          </select>
          <select
            name="subject"
            id="subject"
            className="choose-step1"
            value="toan"
            onChange={onChange}
          >
            <option value="toan">Toán</option>
            <option value="anh">Tiếng Anh</option>
            <option value="ly">Lý</option>
            <option value="hoa">Hóa</option>
          </select>
        </div>
      </div>
      <div className="choose-topic__step2">
        <h3 className="choose-topic__step2-title">B2: Chọn loại đề</h3>
        <div className="choose-topic__step2-exam">
          <div className="choose-topic__step2-exam-type active">
            <h3 className="title">Đề thi giữa kỳ, học kỳ</h3>
            <p>50 câu/60'</p>
          </div>
          <div className="choose-topic__step2-exam-type">
            <h3 className="title">Đề kiểm tra 1 tiết</h3>
            <p>30 câu/45'</p>
          </div>
          <div className="choose-topic__step2-exam-type">
            <h3 className="title">Đề kiểm tra 15 phút</h3>
            <p>10 câu/15'</p>
          </div>
        </div>
      </div>
      <div className="choose-topic__step3">
        <Button
          className="btn-step3"
          value="BẮT ĐẦU LÀM BÀI"
          onClick={handleStart}
        />
      </div>
    </div>
  );
}
