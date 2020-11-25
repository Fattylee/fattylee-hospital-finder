import React from "react";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";

import { Todo } from "../components/Todo";

describe.skip("Todo:", () => {
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

  test("should add new todo correctly", async () => {
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
    findByText("say goodbye");
    // expect(mockFunc).toHaveBeenCalledTimes(30);
    // expect(3).toBe(2);
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
