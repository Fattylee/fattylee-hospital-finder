import Joi from "joi";
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

    const value = AuthValidator.validateAsync(schema, req.body);

    req.body = { ...req.body, ...value };
    next();
  }

  static async loginValidator(req, res, next) {
    const schema = Joi.object({
      identity: Joi.string()
        .$.pattern(
          /^([a-z]{2,}|[a-z0-9_`~!#$%^&*-]+@[a-z0-9]+(\.[a-z]{2,3})+)$/i
        )
        .message("identity must be a valid username/email")
        .trim()
        .lowercase()
        .required(),
      password: Joi.string().pattern(/[a-z]/i).min(5).max(30).required(),
    });

    const value = await AuthValidator.validateAsync(schema, req.body);

    req.body = { ...req.body, ...value };
    next();
  }
}

/**
 * key is required
 * key is not allowed to be empty
 * key length must be at least 3 characters long
 * key length must be less than or equal to 4 characters long
 * key must be a valid username/email
 * email regex: /^([a-z]{2,}|[a-z0-9_-~`!#$%^&\*](\.[a-z0-9_-~`!#$%^&\*]+)?@[a-z0-9]+\.[a-z]{2,3}(\.[a-z]{2},3)+)$/i
 */
