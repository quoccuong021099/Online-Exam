// import React, { useState } from "react";
import Input from "../../common/Input";
export default function Question({ dataItem, handleChange }) {
  return (
    <div>
      <ul className="exam">
        <h4>{dataItem.name}:</h4>
        <p>{dataItem.content}</p>
        {dataItem.answers.map((i) => (
          <label
            htmlFor={`id${i.answer_id}`}
            className="exam__result"
            key={`result${i.answer_id}`}
          >
            <Input
              id={`id${i.answer_id}`}
              name={dataItem.id}
              type="radio"
              value={i.result}
              onChange={() => handleChange(i)}
            />
            <label htmlFor={`id${i.answer_id}`}>{i.content_answer}</label>
          </label>
        ))}
      </ul>
    </div>
  );
}
