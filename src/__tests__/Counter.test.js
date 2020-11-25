import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Counter } from "../components/Counter";

describe("<Counter />", () => {
  function renderCouter(props) {
    const defaultProps = {
      label: "this is my label",
    };
    return render(<Counter {...defaultProps} {...props} />);
  }

  test("should render correctly", async () => {
    const { findByTestId, getByText } = renderCouter();

    getByText("this is my label");
  });
});
