import { Button } from "../components/Button";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("<Button />", () => {
  function renderButton(props) {
    const defaultProps = {
      increment: 1,
      onHandleClick(amount) {},
    };
    return render(<Button {...defaultProps} {...props} />);
  }

  test("should render button component", () => {
    const handler = () => {};
    const onHandleClick = jest.fn().mockImplementation(handler);

    const { getByTestId } = renderButton({ onHandleClick });
    const btn = getByTestId("btn");

    expect(btn).toHaveTextContent("1+");
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(btn).toHaveTextContent("1+");
    expect(onHandleClick).toHaveBeenCalledTimes(3);
    expect(onHandleClick).toHaveBeenCalledWith(1);
    expect(onHandleClick).toHaveBeenNthCalledWith(2, 1);
  });
});
