const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    // validate: {
    //   validator: validator.isMongoId,
    //   message: "{VALUE} this is wrong",
    // },
  },
});

exports.Product = mongoose.model("Product", productSchema);
