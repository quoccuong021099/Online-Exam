import React from "react";

export default function RatingItem({ name }) {
  return (
    <li className="cart__group-item">
      <ul className="cart__group-item-rank">
        <li> {name}</li>
        <li>9đ</li>
        <li>53:50</li>
      </ul>
    </li>
  );
}
