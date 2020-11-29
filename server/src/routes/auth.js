const express = require("express");
const { User } = require("../models/user");
const { NotFound, BadRequest } = require("../utils/error");

const route = express.Router();

route.post("/register", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    return res.status(201).send({
      message: "successful",
      user: newUser.userResponse(),
      token: newUser.genAuthToken(),
    });
  } catch (ex) {
    next(ex);
  }
});

route.post("/login", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) throw new NotFound("User not found");

    if (!(await user.verifyPassword(password)))
      throw new BadRequest("Invalid password");

    return res.status(201).send({
      message: "successful",
      user: user.userResponse(),
      token: user.genAuthToken(),
    });
  } catch (ex) {
    next(ex);
  }
});

exports.auth = route;
