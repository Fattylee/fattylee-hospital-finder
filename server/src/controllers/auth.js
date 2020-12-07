import { User } from "../models/user.js";
import { BadRequest, NotFound } from "../utils/error.js";

export class AuthController {
  static async register(req, res) {
    const newUser = await User.create(req.body);

    return res.status(201).send({
      message: "successful",
      user: newUser.userResponse(),
      token: newUser.genAuthToken(),
    });
  }

  static async login(req, res) {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) throw new NotFound({ identity: "user not found" });

    if (!(await user.verifyPassword(password)))
      throw new BadRequest({ password: "invalid password" });

    return res.status(201).send({
      message: "successful",
      user: user.userResponse(),
      token: user.genAuthToken(),
    });
  }
}
