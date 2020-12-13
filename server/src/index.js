import { join, resolve } from "path";
import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { authRoute } from "./routes/auth.js";
import { productRoute } from "./routes/product.js";
import {
  errorHandler,
  mongooseErrorHandler,
  requestLogger,
} from "./utils/errorHandlerMiddleware.js";
import cors from "cors";

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
app.use("/api/v1/auth", authRoute);

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
