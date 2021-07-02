import React from "react";

export default function Input({
  value,
  placeholder,
  type,
  name,
  id,
  onClick,
  checked,
  onChange,
  ...rest
}) {
  return (
    <>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onClick={onClick}
        onChange={onChange}
        checked={checked}
        {...rest}
      />
    </>
  );
}
