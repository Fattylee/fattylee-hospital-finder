class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) return [400, "Bad Request"];
    else if (this instanceof NotFound) return [404, "Not Found"];
    else if (this instanceof Conflict) return [409, "Conflict"];

    return [500, "Internal Server Error"];
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class Conflict extends GeneralError {}

module.exports = { GeneralError, BadRequest, NotFound, Conflict };
