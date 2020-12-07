import { GeneralError, BadRequest, Conflict } from "./error.js";

export const mongooseErrorHandler = (err, req, res, next) => {
  if (err?.message?.includes("validation")) next(new BadRequest(err));
  else if (err.code === 11000) {
    const field = err.keyValue.username ? "username" : "email";
    next(
      new Conflict({
        [field]: `${field}: '${
          err.keyValue[field.toLocaleLowerCase()]
        }' already taken`,
      })
    );
  }
  next(err);
};

export const errorHandler = (error, req, res, next) => {
  const baseErrorResponse = {
    statusText: "Internal Server Error",
    message: "something went wrong",
    method: req.method,
    path: req.path,
    statusCode: 500,
    timestamp: new Date().toLocaleString(),
    error: error.data,
  };

  if (error instanceof GeneralError) {
    const generalErrorResponse = {
      ...baseErrorResponse,
      statusCode: error.getCode()[0],
      statusText: error.getCode()[1],
      message: error.message,
    };

    // log the error to the server
    console.log({ ...generalErrorResponse, stack: error.stack });

    if (process.env.NODE_ENV !== "production") {
      generalErrorResponse.stack = error.stack;
    }

    return res.status(error.getCode()[0]).json(generalErrorResponse);
  }

  // log the error to the server
  console.log({
    ...baseErrorResponse,
    stack: error.stack,
    error: { error: error.message },
  });

  if (process.env.NODE_ENV !== "production") {
    baseErrorResponse.stack = error.stack;
  }
  res.status(500).json(baseErrorResponse);
};

export const requestLogger = (req, res, next) => {
  const { method, path } = req;
  const timestamp = new Date().toISOString();
  console.log(`${method} ${path} - ${timestamp}`);
  next();
};
