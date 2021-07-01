// import React, { useState } from "react";
import Input from "../../common/Input";
export default function Question({ dataItem, getResult }) {
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
              id={`id${i.id_answer}`}
              name={dataItem.id}
              type="radio"
              value={i.result}
              onChange={() => getResult(i)}
            />
            <label htmlFor={`id${i.id_answer}`}>{i.content_answer}</label>
          </label>
        ))}
      </ul>
    </div>
  );
}
