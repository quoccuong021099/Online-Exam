import React, { useEffect, useState } from "react";
import Question from "./Question";
export default function Exam({ dataTest }) {
  const [resultArr, setResultArr] = useState([]);

  const question = dataTest.map((i) => ({
    id: i.id,
    content: i.content,
    answer: null,
  }));
  
  const getResult = (data) => {
    console.log(data);
    const index = question.findIndex((item) => item.id === data.id_parent);
    console.log(index);
    if (index >= 0) question[index].answer = data;
  };

  return (
    <div>
      {console.log("resultArr:", resultArr)}
      {dataTest.map((item) => (
        <Question
          key={`question${item.id}`}
          dataItem={item}
          getResult={getResult}
        />
      ))}
    </div>
  );
}
