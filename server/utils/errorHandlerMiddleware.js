const { GeneralError } = require("./error");

exports.errorHandler = (error, req, res, next) => {
  const baseErrorResponse = {
    statusText: "",
    message: error.message,
    method: req.method,
    path: req.path,
    statusCode: 0,
    timestamp: new Date().toLocaleString(),
  };

  if (error instanceof GeneralError) {
    const generalErrorResponse = {
      ...baseErrorResponse,
      statusCode: error.getCode()[0],
      statusText: error.getCode()[1],
    };

    // log the error to the server
    console.log({ ...generalErrorResponse, stack: error.stack });

    if (process.env.NODE_ENV !== "production") {
      generalErrorResponse.stack = error.stack;
    }

    return res.status(error.getCode()[0]).json(generalErrorResponse);
  }

  const restErrorResponse = {
    ...baseErrorResponse,
    statusCode: 500,
    statusText: "Internal Server Error",
  };

  console.log({ ...restErrorResponse, stack: error.stack });

  if (process.env.NODE_ENV !== "production") {
    restErrorResponse.stack = error.stack;
  }
  res.status(500).json(restErrorResponse);
};
