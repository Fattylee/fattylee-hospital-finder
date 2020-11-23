import React, { useState, useRef } from "react";
import styled from "./Counter.module.css";
import { Button } from "./Button";

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

export function Todo({ todos: initialTodos = [{ id: 123, todo: "code!!" }] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [todo, setTodo] = useState("");
  const inputRef = useRef(null);

  return (
    <div>
      <h2>Todo List:</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>

      <form
        data-testid="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitted");
          console.log(inputRef.current.value);
          const todo = inputRef?.current?.value.trim();

          if (todo) {
            setTodos((prevTodo) => [...prevTodo, { id: Date.now(), todo }]);

            // clear todo input : uncontrolled input
            inputRef.current.value = "";
            // clear todo input : controlled input
            setTodo("");
          }
        }}
      >
        <label htmlFor="message">Enter some message</label>
        <input
          type="text"
          id="message"
          data-testid="message"
          placeholder="Enter a todo"
          ref={inputRef}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </form>
    </div>
  );
}
