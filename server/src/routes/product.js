import { Router } from "express";
import { isAuthorized } from "../middlewares/isAuthorized.js";
import { ProductController } from "../controllers/product.js";
import { ErrorMiddleware } from "../middlewares/errorMiddleware.js";

const router = Router();

router.get(
  "/",
  ErrorMiddleware.getProductsValidator,
  ProductController.getProducts
);

router.get("/:id", ProductController.getAProduct);

router.post(
  "/",
  isAuthorized,
  ErrorMiddleware.createProductValidator,
  ProductController.createProduct
);

router.delete("/:id", isAuthorized, ProductController.deleteProduct);

export const productRoute = router;
