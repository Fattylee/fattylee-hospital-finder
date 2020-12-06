import { join } from "path";
import { config } from "dotenv";
import express from "express";
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
    if (typeof error === "object") {
      super(error);
      this.message =
        error instanceof Error
          ? error.message
          : Object.values(error).join(", ") + ".";
      // this.message = Object.values(error).reduce(
      //   (preVal, curVal) => preVal + curVal + ", ",
      //   ""
      // );
      this.data = error instanceof Error ? { error: error.message } : error;
    } else {
      super(error);
      this.message = error;
      this.data = { error };
    }
  }
}

try {
  // throw new Me({ email: "invalid email o", name: "name is required" });
  // throw new Me("you too much baba");
  // throw new Me(new Error("baddest"));
  throw new Me(new BadRequest("so baddd"));
} catch (error) {
  console.log(error.message, "============,message");
  console.log(error.data, "===================,data");
  console.log(error.stack, "===================");
}
console.log(Array.isArray([]));
