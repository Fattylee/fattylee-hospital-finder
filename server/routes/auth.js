const express = require("express");
const { User } = require("../models");
const { NotFound, BadRequest, Conflict } = require("../utils/error");

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
    if (ex.code === 11000) {
      const field = ex.keyValue.username ? "Username" : "Email";
      next(
        new Conflict(
          `${field}: '${ex.keyValue[field.toLocaleLowerCase()]}' already taken`
        )
      );
    } else if (ex.message.includes("validation")) {
      next(new BadRequest(ex.message));
    }
    next(ex);
  }
});

route.post("/login", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) throw new NotFound("User not found");

    if (!(await user.verifyPassword(password))) {
      throw new BadRequest("Invalid password");
    }

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
