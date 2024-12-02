import { Router } from "express";
import { router as categoryRouter } from "./category/category.routes.js";
import { router as productRouter } from "./product/product.routes.js";

const router = Router();

router.use("/category", categoryRouter);
router.use("/product", productRouter);

export { router };
