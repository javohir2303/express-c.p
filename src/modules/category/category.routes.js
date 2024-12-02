import {Router} from "express"
import {categoryContr} from "./category.controller.js"

const router = Router()
router.get("/:id", categoryContr.findById.bind(categoryContr))
router.delete("/:id", categoryContr.deleteById.bind(categoryContr))
router.post("/", categoryContr.create.bind(categoryContr))
router.put("/", categoryContr.findById.bind(categoryContr))

export {router}