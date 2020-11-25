import React, { useState, useRef } from "react";
import { createTodo } from "../api";

export function Todo({ todos: initialTodos = [{ id: 123, todo: "code!!" }] }) {
  const [todos, setTodos] = useState(initialTodos);
  const [todo, setTodo] = useState("");
  const inputRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    console.log(inputRef.current.value);
    const todo = inputRef?.current?.value.trim();

    if (todo) {
      const newTodo = { id: Date.now(), todo };
      try {
        const persistedTodo = await createTodo("/todo", newTodo);
        setTodos((prevTodo) => [...prevTodo, persistedTodo]);

        // clear todo input : uncontrolled input
        inputRef.current.value = "";
        // clear todo input : controlled input
        setTodo("");
      } catch (ex) {
        console.log(ex);
      }
    }
  };

  return (
    <div>
      <h2>Todo List:</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>

      <form data-testid="form" onSubmit={handleFormSubmit}>
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
