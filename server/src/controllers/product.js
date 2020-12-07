import Axios from "axios";
import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { BadRequest, Forbidden, NotFound } from "../utils/error.js";

export class ProductController {
  static async getProducts(req, res) {
    const { page, size } = req.query;

    const products = await Product.find()
      .sort({ price: -1 })
      .limit(size)
      .skip((page - 1) * size)
      .populate({
        path: ("owner" in req.query && "owner") || "",
        select: "-password",
      });

    res.status(200).json({
      message: "successful",
      products,
    });
  }

  static async getAProduct(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json({
        message: "successful",
        product,
      });
    } catch (ex) {
      next(ex);
    }
  }
  static async createProduct(req, res, next) {
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
        Object.keys(req.query).find(
          (key) => key.toLocaleLowerCase() === "owner"
        )
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
  }

  static async deleteProduct(req, res, next) {
    try {
      const deletedProduct = await Product.findById(req.params.id);
      if (!deletedProduct) throw new NotFound("Product not found");
      if (req.user.userId !== deletedProduct.owner.toHexString())
        throw new Forbidden("Product does not belongs to you");
      await deletedProduct.deleteOne();
      res.json({ message: "successful", deletedProduct });
    } catch (error) {
      next(error);
    }
  }
}
