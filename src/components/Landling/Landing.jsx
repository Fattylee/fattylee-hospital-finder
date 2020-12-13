import { Button } from "@material-ui/core";
import Axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      Landing Page
      <Link to="/products">Products</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Button
        variant="contained"
        onClick={async (e) => {
          e.preventDefault();
          try {
            const { data } = await Axios.post(
              // "/api/v1/products/5fcb577c6ebead3554e3886f",
              // "/api/v1/products/123456789012345678901234",
              "/api/v1/products?OWNer&page=as&siZe=2",
              {
                // responseType: "blob",
              },
              {
                headers: {
                  authorization: "ahjh",
                },
              }
            );

            // const blob = new Blob([data], { type: "application/pdf" });

            // console.log(blob);
            console.log(data, "**************");
          } catch (error) {
            console.log("error side");
            console.error(error?.response?.data);
          }
        }}
      >
        GEt pdf
      </Button>
    </>
  );
};

export default Landing;
