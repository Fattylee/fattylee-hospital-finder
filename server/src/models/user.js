import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 2,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    validate: {
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: 5,
    required: true,
  },
  fans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

userSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.userResponse = function toJSON() {
  const { username, email } = this;
  return { _id: this.id, username, email, _v: this.__v };
};

userSchema.pre("save", async function hook() {
  const user = this;
  if (!user.isModified("password")) return;

  user.password = await bcrypt.hash(user.password, 10);
});

userSchema.methods.genAuthToken = function genAuthToken() {
  const user = this;
  const { id: userId, username } = user;
  const payload = { userId, username };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

userSchema.virtual("info").get(function () {
  return `My username is ${this.username}`;
});

export const User = mongoose.model("User", userSchema);
