import express from "express";
import { AuthController } from "../controllers/auth.js";
import { AuthValidator } from "../validations/auth.js";

const router = express.Router();

router.post(
  "/register",
  AuthValidator.registerValidator,
  AuthController.register
);

router.post("/login", AuthValidator.loginValidator, AuthController.login);

export { router as authRoute };
