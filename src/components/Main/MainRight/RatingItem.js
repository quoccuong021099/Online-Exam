import React from "react";

export default function RatingItem({ name, point, time }) {
  return (
    <li className="cart__group-item">
      <ul className="cart__group-item-rank">
        <li> {name}</li>
        <li>{point}</li>
        <li>{time}</li>
      </ul>
    </li>
  );
}
