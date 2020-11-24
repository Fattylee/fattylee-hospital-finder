import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import { Counter, Todo } from "./components/Counter";
import renderer from "react-test-renderer";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import api, { createTodo } from "./api";

describe("App", () => {
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

describe("Todo:", () => {
  test("should render Todo snapshot 1", () => {
    const { toJSON } = renderer.create(<Todo />);
    const tree = toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("should render Todo snapshot 2", () => {
    const { toJSON } = renderer.create(
      <Todo todos={[{ id: 9876, todo: "fake and mock all" }]} />
    );
    const tree = toJSON();
    expect(tree).toMatchSnapshot();
  });

  test.skip("should add new todo correctly", async () => {
    // mock createTodo
    // const mockFunc = (api.createTodo = jest.fn());
    const mockFunc = jest.fn();

    const { getByText, getByTestId, getByLabelText, findByText } = render(
      <Todo todos={[{ id: Date.now(), todo: "write test" }]} />
    );

    getByText(/write tesT/i);
    const labelText = getByLabelText("Enter some message");
    fireEvent.change(labelText, { target: { value: "say goodbye" } });

    // waitFor(async () => {
    fireEvent.submit(getByTestId("form"));
    getByText("say goodbye");
    expect(mockFunc).toHaveBeenCalledTimes(30);
    expect(3).toBe(2);
    // })
    //   .then((res) => {
    //     console.log("==============res==========");
    //   })
    //   .catch((err) => {
    //     console.log("=================err=============");
    //   });

    // fireEvent.change(labelText, { target: { value: "recite ur quran" } });

    // expect(getByTestId("message")).toHaveAttribute(
    //   "placeholder",
    //   "Enter a todo"
    // );

    // expect(getByTestId("message")).toHaveAttribute("value", "recite ur quran");

    // fireEvent.submit(getByTestId("form"));
    // expect(getByTestId("message")).toHaveAttribute("value", "");
    // getByText("recite ur quran");
    // findByText("recite ur quran");
  });
});
