import React, { useState } from "react";

export const TestForm = () => {
  const [state, setstate] = useState({
    email: "",
    name: "",
    isdash: false,
    food: "",
  });

  const handleChange = (e) => {
    setstate((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "isdash" ? e.target.checked : e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    setstate({ email: "", name: "", isdash: false, food: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email..."
          value={state.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name..."
          value={state.name}
          onChange={handleChange}
        />

        <input
          type="checkbox"
          name="isdash"
          id="isdash"
          checked={state.isdash}
          onChange={handleChange}
        />
        <select name="food" id="food" onChange={handleChange}>
          <option value="">Pick one</option>
          <option value="rice">Rice</option>
          <option value="beans">Beans</option>
          <option value="yam">Yam</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
