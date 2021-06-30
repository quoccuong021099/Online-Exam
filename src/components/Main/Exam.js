import React from "react";
import Question from "./Question";
export default function Exam() {
  let questions = [1, 2, 3, 4, 5];
  return (
    <div>
      {questions.map((i) => (
        <Question />
      ))}
    </div>
  );
}
