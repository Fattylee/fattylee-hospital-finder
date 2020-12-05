import { Router } from "express";
import { isAuthorized } from "../middlewares/isAuthorized.js";
import { ProductController } from "../controllers/product.js";

const router = Router();

router.get("/", ProductController.getProducts);

router.get("/:id", ProductController.getAProduct);

router.post("/", isAuthorized, ProductController.createProduct);
router.delete("/:id", isAuthorized, ProductController.deleteProduct);

export const productRoute = router;
