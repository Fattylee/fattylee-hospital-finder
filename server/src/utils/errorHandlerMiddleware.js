import Joi from "joi";
import { GeneralError, BadRequest, Conflict } from "./error.js";

export const mongooseErrorHandler = (err, req, res, next) => {
  if (err.message.includes("validation")) next(new BadRequest(err.message));
  else if (err.code === 11000) {
    const field = err.keyValue.username ? "Username" : "Email";
    next(
      new Conflict(
        `${field}: '${err.keyValue[field.toLocaleLowerCase()]}' already taken`
      )
    );
  }
  next(err);
};

export const errorHandler = (error, req, res, next) => {
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
      error: {
        error: error.message,
      },
    };

    // log the error to the server
    console.log({ ...generalErrorResponse, stack: error.stack });

    if (process.env.NODE_ENV !== "production") {
      generalErrorResponse.stack = error.stack;
    }

    return res.status(error.getCode()[0]).json(generalErrorResponse);
  }

  // if (error instanceof Joi.ValidationError) {
  if (Joi.isError(error)) {
    const errorObj = error.details.reduce((prevValue, curValue) => {
      prevValue[curValue.path[0]] = curValue.message;
      return prevValue;
    }, {});

    return res.status(400).json({
      ...baseErrorResponse,
      error: errorObj,
      statusCode: 400,
      statusText: "BadRequest",
    });
  }

  const restErrorResponse = {
    ...baseErrorResponse,
    statusCode: 500,
    statusText: "Internal Server Error",
  };

  // log the error to the server
  console.log({ ...restErrorResponse, stack: error.stack });

  if (process.env.NODE_ENV !== "production") {
    restErrorResponse.stack = error.stack;
  }
  res.status(500).json(restErrorResponse);
};

export const requestLogger = (req, res, next) => {
  const { method, path } = req;
  const timestamp = new Date().toISOString();
  console.log(`${method} ${path} - ${timestamp}`);
  next();
};
