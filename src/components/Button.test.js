import { Button } from "./Button";
import React from "react";
import ReactDOM from "react-dom";

describe("Button", () => {
  test("should render button component", () => {
    const root = document.createElement("div");
    ReactDOM.render(<Button />, root);

    expect(root.querySelector("button").textContent).toBe("+");
  });
});
