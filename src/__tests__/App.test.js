import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import { Counter } from "../components/Counter";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe.skip("App", () => {
  test("should render App on the DOM", () => {
    const root = document.createElement("div");

    ReactDOM.render(<Counter />, root);

    expect(root.querySelector("div h1").textContent).toMatch(/counter app/i);
  });

  test("should render snapShot", () => {
    const tree = renderer.create(<Counter />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("should render counter correctly using @testing-library/react", () => {
    const { getByText, getByLabelText } = render(<Counter />);
    const elem = getByText("This is my counter App");
    expect(elem).not.toBeNull();
    expect(elem.textContent).toMatch(/counter\s+app/i);
    expect(elem).toHaveTextContent(/counter\s*app/i);
    getByLabelText(/some message/);
    getByLabelText("Enter some message");
    getByText(/nothing Much/i);
    // expect(getByLabelText("Enter some message")).toHaveTextContent(
    //   "Enter some message"
    // );
  });

  test("should render counter again", () => {
    const { getByText } = render(<Counter label="this is serious" />);
    getByText("this is serious");
  });

  test("should click count button", () => {
    const { getByText } = render(<Counter />);
    getByText("Count: 0");
    const btnPlusOne = getByText("1+");
    fireEvent.click(btnPlusOne);
    fireEvent.click(btnPlusOne);
    fireEvent.click(getByText("10+"));
    getByText("Count: 12");
    fireEvent.click(getByText("100+"));
    getByText("Count: 112");
    // fireEvent.
  });
});
