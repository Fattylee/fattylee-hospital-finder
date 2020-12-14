import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { BadRequest, Forbidden, NotFound } from "../utils/error.js";

export class ProductController {
  static async getProducts(req, res) {
    const { page, size } = req.query;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(size)
      .skip((page - 1) * size)
      .populate({
        path: "owner" in req.query ? "owner" : "",
        select: "-password",
      });

    res.status(200).json({
      message: "successful",
      products,
    });
  }

  static async getAProduct(req, res, next) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequest({ id: `Invalid product id '${id}'` });
      const product = await Product.findById(id);
      if (!product) throw new NotFound("Product not found");

      res.status(200).json({
        message: "successful",
        product,
      });
    } catch (ex) {
      next(ex);
    }
  }

  static async createProduct(req, res) {
    const { userId } = req.user || {};

    if (!userId) {
      throw new Forbidden("Unauthorized token, please re-login");
    }
    const owner = userId;
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      throw new BadRequest("Invalid object id");
    }

    const { title, price, selectedfile } = req.body;
    console.log(selectedfile, "+");
    const newProduct = new Product({
      title,
      owner,
      price,
      selectedFile: selectedfile,
    });

    // optionally populate owner field
    if ("owner" in req.query) {
      newProduct.populate("owner").execPopulate();
    }

    await newProduct.save();

    res.status(201).json({
      message: "successful",
      product: newProduct,
    });
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequest({ id: `Invalid product id '${id}'` });

    const deletedProduct = await Product.findById(id);
    if (!deletedProduct) throw new NotFound("Product not found");

    if (req.user.userId !== deletedProduct.owner.toHexString())
      throw new Forbidden("Product does not belongs to you");
    await deletedProduct.deleteOne();
    res.json({ message: "successful", deletedProduct });
  }

  static async editProduct(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequest({ id: `Invalid product id '${id}'` });

    let product = await Product.findById(id);

    if (!product) throw new NotFound("Product not found");

    if (req.user.userId !== product.owner.toString())
      throw new Forbidden("Product does not belongs to you");

    product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    res.json({ message: "successful", product });
  }
}
