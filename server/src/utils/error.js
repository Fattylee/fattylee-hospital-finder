import Joi from "joi";

class GeneralError extends Error {
  constructor(error) {
    super(error);
    if (Joi.isError(error)) {
      this.message = error.message;
      this.data = error.details.reduce(
        (prev, cur) => ({
          ...prev,
          [cur.path[0]]: cur.message,
        }),
        {}
      );
    } else if (typeof error === "object") {
      this.message =
        error instanceof Error
          ? error.message
          : Object.values(error).join(", ") + ".";
      this.data = error instanceof Error ? { error: error.message } : error;
    } else {
      this.message = error;
      this.data = { error };
    }
  }

  getCode() {
    if (this instanceof BadRequest) return [400, "Bad Request"];
    else if (this instanceof NotFound) return [404, "Not Found"];
    else if (this instanceof Conflict) return [409, "Conflict"];
    else if (this instanceof Unauthorize) return [401, "Unauthorized"];
    else if (this instanceof Forbidden) return [403, "Forbidden"];

    return [500, "Internal Server Error"];
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Conflict extends GeneralError {}
class Unauthorize extends GeneralError {}
class Forbidden extends GeneralError {}

export { GeneralError, BadRequest, NotFound, Conflict, Unauthorize, Forbidden };
