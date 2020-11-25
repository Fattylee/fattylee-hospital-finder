import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { LoginForm } from "../components/LoginForm";

describe("<LoginForm />", () => {
  function renderForm(prop) {
    const defaultProps = {
      onHandleUsername(username) {
        // console.log(username, "my props implementation");
      },
      onHandlePassword(password) {},
      onHandleRememberme(rememberme) {},
      onHandleSubmit(username, password, rememberme) {},
    };

    return render(<LoginForm {...defaultProps} {...prop} />);
  }

  test("should render login form component", async () => {
    const { findByTestId } = renderForm();

    const loginForm = await findByTestId("login-form");
    expect(loginForm).toHaveFormValues({
      username: "",
      password: "",
      rememberme: true,
    });
  });

  test("should allow entering a username", async () => {
    const onHandleUsername = (username) => {
      console.log("override");
      console.log(username);
    };
    const mockFn = jest
      .fn()
      .mockImplementation(onHandleUsername)
      .mockImplementation((username) => {});

    const { findByTestId, getByTestId, getByText } = renderForm({
      onHandleUsername: mockFn,
    });

    const username = await findByTestId("username");
    expect(username.value).toBe("");
    fireEvent.change(username, { target: { value: "happy coding!!" } });

    expect(username.value).toMatch("coding");
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(expect.stringContaining("coding"));
  });

  test("should allow entering a password", () => {
    const onHandlePassword = jest.fn();
    const { findByTestId, getByTestId } = renderForm({ onHandlePassword });
    const password = getByTestId("password");

    expect(password).toHaveValue("");
    fireEvent.change(password, { target: { value: "zero" } });
    expect(password).toHaveValue("zero");

    fireEvent.change(password, { target: { value: "last" } });
    expect(password).toHaveValue("last");

    fireEvent.change(password, { target: { value: "lust" } });
    expect(password).toHaveValue("lust");

    // expect(onHandlePassword).toHaveBeenCalledWith("ast");
    expect(onHandlePassword).toHaveBeenCalledWith("zero");
    expect(onHandlePassword).toHaveBeenNthCalledWith(2, "zero");
  });

  test("should allow toggling Remember me", async () => {
    const onHandleRememberme = jest.fn();
    const { findByTestId } = renderForm({ onHandleRememberme });

    const remember = await findByTestId("rememberme");
    expect(remember).toBeChecked();

    fireEvent.click(remember);
    expect(onHandleRememberme).toHaveBeenCalled();
    expect(remember).not.toBeChecked();
    fireEvent.click(remember);
    expect(remember).toBeChecked();
    expect(onHandleRememberme).toHaveBeenCalledTimes(2);

    fireEvent.click(remember);
    expect(onHandleRememberme).toHaveBeenNthCalledWith(3, false);
    expect(onHandleRememberme).toHaveBeenNthCalledWith(2, true);
  });

  test("should allow form submittion", async () => {
    const onHandleSubmit = jest.fn();
    const { findByTestId } = renderForm({ onHandleSubmit });

    const form = await findByTestId("login-form");
    fireEvent.submit(form);

    expect(form).toHaveFormValues({
      username: "",
      password: "",
      rememberme: true,
    });

    fireEvent.change(await findByTestId("username"), {
      target: { value: "user" },
    });
    fireEvent.change(await findByTestId("password"), {
      target: { value: "pass" },
    });
    fireEvent.click(await findByTestId("rememberme"));

    expect(form).toHaveFormValues({
      username: "user",
      password: "pass",
      rememberme: false,
    });

    fireEvent.submit(form);

    expect(onHandleSubmit).toHaveBeenCalledTimes(2);
    expect(onHandleSubmit).toHaveBeenNthCalledWith(2, "user", "pass", false);
    expect(onHandleSubmit).toHaveBeenNthCalledWith(1, "", "", true);
  });
});
