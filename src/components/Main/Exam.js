import React, { useEffect, useState } from "react";
import Question from "./Question";
import Button from "../../common/Button";

export default function Exam({ dataTest }) {
  const [selectedRadio, setSelectedRadio] = useState([]);

  const handleChange = (data) => {
    if (selectedRadio.length > 0) {
      const index = selectedRadio.findIndex(
        (item) => item.parent_id === data.parent_id
      );
      console.log("data:", data);
      console.log("index: ", index);
      if (index >= 0) {
        selectedRadio[index] = data;
        setSelectedRadio([...selectedRadio]);
        console.log("selectedRadio với index >= 0: ", selectedRadio);
      } else {
        setSelectedRadio([...selectedRadio, data]);
        console.log("selectedRadio với index < 0: ", selectedRadio);
      }
    } else {
      setSelectedRadio([...selectedRadio, data]);
    }
  };

  const doneExam = (e) => {
    e.preventDefault();
    const newArr = selectedRadio;
    let resultTrue = 0;
    let resultFalse = 0;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].result === false) ++resultFalse;
      else ++resultTrue;
    }
    // const result = newArr.map((i) => i.result);
    console.log(
      "resultTrue: ",
      resultTrue,
      " và ",
      "resultFalse ",
      resultFalse
    );
  };
  return (
    <div>
      {console.log("selectedRadio RENDER ", selectedRadio)}
      <form onSubmit={doneExam}>
        {dataTest.map((item) => (
          <Question
            key={`question${item.id}`}
            dataItem={item}
            handleChange={handleChange}
          />
        ))}
        <div className="exam__pagination">
          {/* <Button
            className="exam__pagination-prev"
            value={<i className="fas fa-arrow-left"></i>}
          /> */}
          <Button
            className="exam__pagination-submit"
            value="NỘP BÀI"
            type="submit"
          />
          {/* <Button
            className="exam__pagination-next"
            value={<i className="fas fa-arrow-right"></i>}
          /> */}
        </div>
      </form>
    </div>
  );
}
