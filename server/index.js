const express = require("express");
const mongoose = require("mongoose");
const { auth } = require("./routes/auth");
const { errorHandler } = require("./utils/errorHandlerMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", auth);
const port = process.env.PORT || 5000;

app.use(errorHandler);

// app.use((ex, req, res, next) => {
//   // console.log(JSON.stringify(ex));
//   console.log(ex);
//   console.log("==========================================");

//   if (ex.code === 11000) {
//     const field = ex.keyValue.username ? "Username" : "Email";

//     return res.status(409).send({
//       errorr: {
//         message: `${field} '${
//           ex.keyValue[field.toLocaleLowerCase()]
//         }' already taken`,
//       },
//     });
//   }

//   if (ex.errMsg) {
//     return res.status(ex.status).send({
//       errorr: {
//         message: ex.errMsg,
//       },
//     });
//   }

//   res.status(500).send({
//     errorr: {
//       message: ex.message,
//     },
//   });
// });

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
