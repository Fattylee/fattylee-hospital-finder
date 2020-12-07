import express from "express";
import { ErrorMiddleware } from "../middlewares/errorMiddleware.js";
import { AuthController } from "../controllers/auth.js";

const router = express.Router();

router.post(
  "/register",
  ErrorMiddleware.registerValidator,
  AuthController.register
);

router.post("/login", ErrorMiddleware.loginValidator, AuthController.login);

export { router as auth };
