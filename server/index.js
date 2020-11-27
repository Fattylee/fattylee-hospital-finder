const express = require("express");
const mongoose = require("mongoose");
const { isAuthorized } = require("./middlewares/isAuthorized");
const { auth } = require("./routes/auth");
const { productRoute } = require("./routes/product");
const { errorHandler } = require("./utils/errorHandlerMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", auth);

// protected route
app.use("/api/v1/products", isAuthorized, productRoute);

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
