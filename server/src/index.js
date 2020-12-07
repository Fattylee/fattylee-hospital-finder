import { join } from "path";
import { config } from "dotenv";
import express, { json } from "express";
import mongoose from "mongoose";
import { auth } from "./routes/auth.js";
import { productRoute } from "./routes/product.js";
import {
  errorHandler,
  mongooseErrorHandler,
  requestLogger,
} from "./utils/errorHandlerMiddleware.js";
import cors from "cors";
import { isArray } from "util";
import { BadRequest } from "./utils/error.js";
import Joi from "joi";

config({
  path: join(process.cwd(), ".env.server"),
});

const app = express();

// process.on("uncaughtException", (ex) => {
//   console.log(ex);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(requestLogger);
app.use("/api/v1/auth", auth);

app.use("/api/v1/products", productRoute);

app.use(mongooseErrorHandler);
app.use(errorHandler);

const port = process.env.PORT || 5000;
mongoose
  .connect("mongodb://localhost/bezkoder", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Connection to mongodb was successfully");
    app.listen(port, () => console.log(`Server running on port: ${port}`));
  })
  .catch((err) => {
    console.log(err.message);
  });

class Me extends Error {
  constructor(error) {
    super(error);
    if (Joi.isError(error)) {
      this.message = error.message;
      this.data = error.details.reduce((prev, cur) => {
        prev[cur.path[0]] = cur.message;
        return prev;
      }, {});
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
}

try {
  const { value, error } = Joi.object({
    a: Joi.number().required().min(3),
    b: Joi.number().required().min(3),
  }).validate({}, { abortEarly: false });
  // console.log(value, "==========value");
  // console.log(error);
  // console.log(error.message);
  // throw new Me(error);
  // throw new Me({ a: 1 });
  // throw new Me(new Error("sam"));
  throw new Me([2, "23"]);
} catch (error) {
  console.log(error.message, "=================message");
  console.log(error.data, "=============data");
  console.log(error);
}
