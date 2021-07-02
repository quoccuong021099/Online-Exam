import React, { useState } from "react";
import Question from "./Question";
export default function Exam({ dataTest }) {

  const [selected, setSelected] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState([]);
  
  // checked checkbox
  const handleChecked = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };


  // checked radio
  const handleChange = (id, arr) => {
    const index = arr.findIndex((item) => item.id_answer === id);
    if (index >= 0) {
      const answerId = arr[index].id_answer;
      setSelectedRadio([answerId])
    } 
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  console.log("selected", [...selected, ...selectedRadio]);
  return (
    <div>
      {dataTest.map((i) => (
        <Question
          key={`question${i.id}`}
          dataItem={i}
          handleChecked={handleChecked}
          isSelected={isSelected}
          selected={selected}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
}
