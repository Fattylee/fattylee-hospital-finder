import mongoose from "mongoose";
import { Router } from "express";
import { isAuthorized } from "../middlewares/isAuthorized.js";
import { Product } from "../models/product.js";
import { Forbidden, BadRequest } from "../utils/error.js";
import { User } from "../models/user.js";

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
    // console.log(req.options, "============");
    const { userId } = req.user || {};

    if (!userId) {
      throw new Forbidden("Unauthorized userId");
    }
    const owner = userId;
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      throw new BadRequest("Invalid object id");
    }

    const { title, price } = req.body;
    const newProduct = new Product({
      title,
      owner,
      price,
    });
    // if ("owner" in req.query) {
    if (
      Object.keys(req.query).find((key) => key.toLocaleLowerCase() === "owner")
    ) {
      newProduct.populate("owner").execPopulate();
    }
    await newProduct.save();

    res.status(201).json({
      message: "successful",
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
});

export const productRoute = route;
