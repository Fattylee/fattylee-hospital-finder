import Joi from "joi";

export class BaseValidator {
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
    const queryObj = req[property];
    req[property] = Object.entries(queryObj).reduce((prev, cur) => {
      prev[cur[0].toLocaleLowerCase()] = cur[1];
      return prev;
    }, {});
  }
}
