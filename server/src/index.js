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
import multer from "multer";
// const upload = multer({ dest: resolve("./server/fatai") });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req);
    console.log(file);
    cb(null, resolve("server/base"));
  },
  filename: (req, file, cb) => {
    cb(null, file.filename + "_" + Date.now());
  },
});

const upload = multer({
  storage,
  limits: {
    // fileSize: 45,
  },
});

config({
  path: join(process.cwd(), ".env.server"),
});

const app = express();

// process.on("uncaughtException", (ex) => {
//   console.log(ex);
// });

app.post(
  "/create",
  upload.fields([{ name: "papa", maxCount: 11 }]),
  (req, res) => {
    // console.log(req.file);
    console.log(req.files);
    console.log(req.body);
    res.send("successful");
  }
);
app.get("/create", (req, res) => {
  res.sendFile(resolve("./server/fatai/fat"));
});

app.get("/down", (req, res) => {
  const filePath = resolve("server/base/pat1");
  res.sendFile(filePath, (err) => {
    res.status(500).send("nonsense: " + err.message);
  });
  // res.download(filePath, "myfile", (err) => {
  //   if (err) {
  //     return res.status(500).send("cannot download file " + err.message);
  //   }
  // });
});

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use(requestLogger);
app.use("/api/v1/auth", authRoute);

app.use("/api/v1/products", productRoute);

app.use(mongooseErrorHandler);
app.use(errorHandler);

const port = process.env.PORT || 5100;
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
