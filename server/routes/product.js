const { Router } = require("express");
const route = Router();

const products = [
  { id: 1, title: "milk" },
  { id: 2, title: "sugar" },
];

route.get("/", (req, res, next) => {
  res.status(200).json({
    message: "successful",
    products,
  });
});

route.get("/:id", (req, res, next) => {
  const product = products.find((p) => p.id === +req.params.id);
  res.status(200).json({
    message: "successful",
    product,
  });
});

exports.productRoute = route;
