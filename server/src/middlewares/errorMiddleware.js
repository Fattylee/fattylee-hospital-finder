import Joi from "joi";

export class ErrorMiddleware {
  static async register(req, res, next) {
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
    if (error) next(error);
    req.body = value;
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
}
