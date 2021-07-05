import React from "react";

export default function Button({ className, value, onClick, type, disabled }) {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        className={`btn ${className}`}
        onClick={onClick}
      >
        {value}
      </button>
    </>
  );
}
