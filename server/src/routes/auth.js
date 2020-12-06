import express from "express";
import { User } from "../models/user.js";
import { NotFound, BadRequest } from "../utils/error.js";
import Joi from "joi";
import { ErrorMiddleware } from "../middlewares/errorMiddleware.js";

const route = express.Router();

route.post("/register", ErrorMiddleware.register, async (req, res, next) => {
  try {
    // const schema = Joi.object({
    //   mama: Joi.string().valid("b").forbidden().required(),
    //   gender: Joi.string().valid("male", "female", "other").required(),

    //   other: Joi.string().when("gender", { is: "other", then: Joi.required() }),

    //   username: Joi.string()
    //     .min(2)
    //     .max(30)
    //     .required()
    //     .trim()
    //     .valid("fat", "keypad"),
    //   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    //   repeat_password: Joi.ref("password"),
    //   tags: Joi.array()
    //     .items(
    //       Joi.string()
    //         .pattern(/[a-zA-Z]+/)
    //         .min(3)
    //         .max(5)
    //     )
    //     .required(),
    //   admin: Joi.string().default("baba"),
    //   fake: Joi.string().case("lower").uppercase(),
    // }).xor("mama", "gender");

    // const { value, error } = await schema.validate(req.body, {
    //   abortEarly: false,
    //   stripUnknown: true,
    //   errors: {
    //     // stack: true,
    //     wrap: {
    //       label: "",
    //     },
    //   },
    // });

    // if (error) throw error;
    console.log(req.body);
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

export { route as auth };
