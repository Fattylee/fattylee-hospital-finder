import Joi from "joi";
import { BadRequest } from "../utils/error.js";
import { BaseValidator } from "./base.js";

export class ProductValidator extends BaseValidator {
  static async getProductsValidator(req, res, next) {
    ProductValidator.lowerCaseReqProp(req, "query");

    const schema = Joi.object({
      page: Joi.number().greater(0).default(1),
      size: Joi.number().greater(0).positive().default(Math.pow(10, 10)),
    });

    const value = await ProductValidator.validateAsync(schema, req.query);
    req.query = { ...req.query, ...value };
    next();
  }

  static async createProductValidator(req, res, next) {
    ProductValidator.lowerCaseReqProp(req, "query");

    const schema = Joi.object({
      title: Joi.string().trim().min(2).required(),
      price: Joi.number().positive().empty("").default(0),
    });

    const value = await ProductValidator.validateAsync(schema, req.body);

    req.body.price = value.price;
    req.body.title = value.title;
    next();
  }
}
