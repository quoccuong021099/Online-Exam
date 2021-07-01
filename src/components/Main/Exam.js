import React, { useState } from "react";
import Question from "./Question";
export default function Exam({ dataTest }) {
  // const [resultArr, setResultArr] = useState([]);

  const question2 = dataTest.map((i) => ({
    id: i.id,
    content: i.content,
    answer: i.answer,
  }));

  const getResult = (data) => {
    console.log("data", data);
    // setResultArr([...resultArr, data]);
    console.log(question2);
    const index = question2.findIndex((i) => i.answer === data.id_parent);
    if (index >= 0) {
      question2[index].answer = data;
      // setResultArr([...resultArr, question2])
    }
  };

  return (
    <div>
      {/* {console.log("resultArr: ", resultArr)} */}
      {/* {console.log("question2: ", question2)} */}
      {dataTest.map((i) => (
        <Question key={`question${i.id}`} dataItem={i} getResult={getResult} />
      ))}
    </div>
  );
}
