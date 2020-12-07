import Joi from "joi";
import { BadRequest } from "../utils/error.js";

export class ErrorMiddleware {
  static async registerValidator(req, res, next) {
    const schema = Joi.object({
      username: Joi.string()
        .pattern(/[a-z]/i)
        .min(2)
        .max(30)
        .trim()
        .lowercase()
        .required(),
      password: Joi.string().pattern(/[a-z]/i).min(5).max(30).required(),
      email: Joi.string().email().required(),
    });

    const { value, error } = ErrorMiddleware.validate(schema, req.body);
    if (error) throw new BadRequest(error);

    req.body = value;
    next();
  }
  static async loginValidator(req, res, next) {
    const schema = Joi.object({
      username: Joi.string()
        .pattern(/[a-z]/i)
        .min(2)
        .max(30)
        .trim()
        .lowercase()
        .required(),
      password: Joi.string().pattern(/[a-z]/i).min(5).max(30).required(),
      email: Joi.string().email().required(),
    });

    const { value, error } = ErrorMiddleware.validate(schema, req.body);
    if (error) throw new BadRequest(error);

    req.body = value;
    next();
  }

  static getProductsValidator(req, res, next) {
    ErrorMiddleware.lowerCaseReqProp(req, "query");

    const schema = Joi.object({
      page: Joi.number().greater(0).default(1),
      size: Joi.number().greater(0).positive().default(Math.pow(10, 10)),
    });

    const { value, error } = ErrorMiddleware.validate(schema, req.query);
    if (error) throw new BadRequest(error);
    req.query = { ...req.query, ...value };
    next();
  }

  static validate(schema, value) {
    return schema.validate(value, {
      abortEarly: false,
      stripUnknown: true,
      errors: {
        wrap: {
          label: "",
        },
      },
    });
  }

  static lowerCaseReqProp(req, property = "query") {
    let { query: queryObj } = req;
    req[property] = Object.entries(queryObj).reduce((prev, cur) => {
      prev[cur[0].toLocaleLowerCase()] = cur[1];
      return prev;
    }, {});
  }
}
