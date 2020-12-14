import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    selectedFile: String,
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
