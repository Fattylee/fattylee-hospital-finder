const mongoose = require("mongoose");
const { Router } = require("express");
const { isAuthorized } = require("../middlewares/isAuthorized");
const { Product } = require("../models/product");
const { Forbidden } = require("../utils/error");
const { User } = require("../models/user");
const route = Router();

const products = [
  { id: 1, title: "milk" },
  { id: 2, title: "sugar" },
];

route.get("/test", async (req, res, next) => {
  const products = await mongoose.model("Product").find().populate("owner");

  res.status(200).json({
    message: "successful",
    products,
  });
});

route.get("/", async (req, res, next) => {
  const products = await Product.find()
    .populate("owner", "username -_id", "Users", /fatty/)
    // .populate({ path: "owner", select: "username email", match: /fatty/ })
    .limit(2);

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

route.post("/", isAuthorized, async (req, res, next) => {
  try {
    console.log(req.query);
    const { userId } = req.user || {};

    if (!userId) {
      throw new Forbidden("Unauthorized userId");
    }

    const { title } = req.body;
    const newProduct = new Product({ title, owner: userId });
    // if ("owner" in req.query) {
    if (
      Object.keys(req.query).find((key) => key.toLocaleLowerCase() === "owner")
    ) {
      newProduct.populate("owner").execPopulate();
    }
    await newProduct.save();
    // await Product.populate(newProduct, { path: "owner" });
    // const newProduct = await Product.create(
    //   {
    //     title,
    //     owner: userId,
    //   }
    //   // { populate: { path: "owner" } }
    // ).populate("owner");
    // console.log(newProduct.populate("owner"));

    res.status(201).json({
      message: "successful",
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
});

exports.productRoute = route;
