import { Router } from "express";
import { isAuthorized } from "../middlewares/isAuthorized.js";
import { ProductController } from "../controllers/product.js";
import { ProductValidator } from "../validations/product.js";

const router = Router();

router.get(
  "/",
  ProductValidator.getProductsValidator,
  ProductController.getProducts
);

router.get("/:id", ProductController.getAProduct);

router.post(
  "/",
  isAuthorized,
  ProductValidator.createProductValidator,
  ProductController.createProduct
);

router.delete("/:id", isAuthorized, ProductController.deleteProduct);

router.patch(
  "/:id",
  isAuthorized,
  ProductValidator.createProductValidator,
  ProductController.editProduct
);
export const productRoute = router;
