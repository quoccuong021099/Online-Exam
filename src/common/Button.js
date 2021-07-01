import React from "react";

export default function Button({ className, value }) {
  return (
    <>
      <button className={`btn ${className}`}>{value}</button>
    </>
  );
}
