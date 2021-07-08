import React from "react";
import Input from "./Input";

export default function InputWithLabel({
  classNameLable,
  htmlFor,
  type,
  idInput,
  defaultChecked,
  onChangeInput,
  spanText,
  nameInput,
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={classNameLable}>
        <Input
          type={type}
          id={idInput}
          name={nameInput}
          defaultChecked={defaultChecked}
          onChange={onChangeInput}
        />
        {spanText && <span>{spanText}</span>}
      </label>
    </div>
  );
}
