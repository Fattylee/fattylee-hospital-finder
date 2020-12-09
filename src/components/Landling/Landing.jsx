import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      Landing Page
      <Link to="/products">Products</Link>
      <Link to="/dashboard">Dashboard</Link>
    </>
  );
};

export default Landing;
