import React from "react";

export default function Button({ className, value, onClick, type }) {
  return (
    <>
      <button type={type} className={`btn ${className}`} onClick={onClick}>
        {value}
      </button>
    </>
  );
}
