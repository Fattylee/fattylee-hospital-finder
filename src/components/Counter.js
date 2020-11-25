import React, { useState, useRef } from "react";
import styled from "./Counter.module.css";
import { Button } from "./Button";
import { Todo } from "./Todo";

export const Counter = ({ label = "nothing much" }) => {
  const [counter, setCounter] = useState(0);
  const handleIncrement = (amount) => setCounter(counter + amount);

  return (
    <div>
      <hr />

      <h2>{label}</h2>
      <h1>This is my counter App</h1>
      <h2>Count: {counter}</h2>
      <Button increment={1} onHandleClick={handleIncrement} />
      <Button increment={10} onHandleClick={handleIncrement} />
      <Button increment={100} onHandleClick={handleIncrement} />
      <Button increment={1000} onHandleClick={handleIncrement} />

      <div>
        <button className={styled.btn} onClick={() => setCounter(0)}>
          Clear counter
        </button>
      </div>
      <Todo todos={[{ id: Date.now(), todo: "Read the quran" }]} />
    </div>
  );
};
