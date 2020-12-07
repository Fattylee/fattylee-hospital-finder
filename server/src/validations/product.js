import Joi from "joi";
import { BadRequest } from "../utils/error.js";
import { BaseValidator } from "./base.js";

export class ProductValidator extends BaseValidator {
  static getProductsValidator(req, res, next) {
    ProductValidator.lowerCaseReqProp(req, "query");

    const schema = Joi.object({
      page: Joi.number().greater(0).default(1),
      size: Joi.number().greater(0).positive().default(Math.pow(10, 10)),
    });

    const { value, error } = ProductValidator.validate(schema, req.query);
    if (error) throw new BadRequest(error);
    req.query = { ...req.query, ...value };
    next();
  }

  static createProductValidator(req, res, next) {
    ProductValidator.lowerCaseReqProp(req, "query");
    ProductValidator.lowerCaseReqProp(req, "body");

    const schema = Joi.object({
      title: Joi.string().trim().min(2).required(),
      price: Joi.number().greater(0).positive().default(0),
    });

    const { value, error } = ProductValidator.validate(schema, req.body);
    if (error) throw new BadRequest(error);

    req.body.price = value.price;
    req.body.title = value.title;
    next();
  }
}
