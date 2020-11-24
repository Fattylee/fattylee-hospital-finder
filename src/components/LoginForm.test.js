import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { LoginForm } from "./LoginForm";

describe("<LoginForm />", () => {
  function renderForm(prop) {
    const defaultProps = {
      onHandleUsername(username) {},
      onHandlePassword(password) {},
      onHandleRememberme(rememberme) {},
      onHandleSubmit(username, password, rememberme) {},
    };

    return render(<LoginForm {...defaultProps} {...prop} />);
  }

  test("should render login form component", async () => {
    const {
      findByTestId,
      getByLabelText,
      getByTestId,
      getByText,
    } = renderForm();

    // try {
    // await findByText("Username");
    const loginForm = await findByTestId("login-form");
    expect(loginForm).toHaveFormValues({
      username: "",
      password: "",
      rememberme: true,
    });
    // } catch (ex) {
    //   console.log("surpress,=============");
    // }
  });
});
