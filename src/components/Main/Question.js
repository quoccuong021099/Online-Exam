// import React, { useState } from "react";
import Input from "../../common/Input";
export default function Question({
  dataItem,
  handleChecked,
  isSelected,
  selected,
  handleChange,
}) {
  return (
    <div>
      <ul className="exam">
        <h4>{dataItem.name}:</h4>
        <p>{dataItem.content}</p>
        {dataItem.answer.map((i) => (
          <label
            htmlFor={`id${i.id_answer}`}
            className="exam__result"
            key={`result${i.id_answer}`}
          >
            <Input
              type={dataItem.type}
              id={`id${i.id_answer}`}
              name={dataItem.id}
              value={i.result}
              onChange={
                dataItem.type === "checkbox"
                  ? (e) => handleChecked(e, i.id_answer)
                  : () => handleChange(i.id_answer, dataItem.answer)
              }
              checked={
                dataItem.type === "checkbox" ? isSelected(i.id_answer) : null
              }
            />
            <label htmlFor={`id${i.id_answer}`}>{i.content_answer}</label>
          </label>
        ))}
      </ul>
    </div>
  );
}