import React, { useState } from "react";
import styled from "./Counter.module.css";

export const Button = ({ increment, onHandleClick }) => {
  const handleClick = () => {
    onHandleClick(increment);
  };

  return (
    <button className={styled.btn} onClick={handleClick}>
      {increment}+
    </button>
  );
};
