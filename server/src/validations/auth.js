import Joi from "joi";
import { BadRequest } from "../utils/error.js";
import { BaseValidator } from "./base.js";

export class AuthValidator extends BaseValidator {
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

    const { value, error } = AuthValidator.validate(schema, req.body);
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

    const { value, error } = AuthValidator.validate(schema, req.body);
    if (error) throw new BadRequest(error);

    req.body = value;
    next();
  }
}
