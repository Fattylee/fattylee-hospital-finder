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

config({
  path: join(process.cwd(), ".env.server"),
});

const app = express();

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
