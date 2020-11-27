const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
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
});

UserSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.userResponse = function toJSON() {
  const { username, email } = this;
  return { _id: this.id, username, email, _v: this.__v };
};

UserSchema.pre("save", async function hook() {
  const user = this;
  if (!user.isModified("password")) return;

  user.password = await bcrypt.hash(user.password, 10);
});

UserSchema.methods.genAuthToken = function genAuthToken() {
  const user = this;
  const { id, username } = user;
  const payload = { id, username };
  return jwt.sign(payload, "mySuperSecret", { expiresIn: "7d" });
};

exports.User = mongoose.model("User", UserSchema);
