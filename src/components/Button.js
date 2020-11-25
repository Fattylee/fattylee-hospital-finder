import React from "react";
import styled from "./Counter.module.css";

export const Button = ({ increment, onHandleClick }) => {
  const handleClick = () => {
    onHandleClick(increment);
  };

  return (
    <button data-testid="btn" className={styled.btn} onClick={handleClick}>
      {increment}+
    </button>
  );
};
