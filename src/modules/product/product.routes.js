import { Router } from "express"
import { productController } from "./product.controlles.js"

const router = Router()

router.post("/", productController.create.bind(productController))
router.get("/", productController.findAll.bind(productController))
router.get("/:id", productController.findById.bind(productController))
router.delete("/:id", productController.deleteById.bind(productController))

export { router }
