import { CustomError } from "../../lib/customError.js"
import { productService } from "./product.service.js"
import { categoryService } from "../category/category.service.js"

class ProductController {
    #productServer
    #categoryServer
    constructor(productServer, categoryServer) {
        this.#productServer = productServer
        this.#categoryServer = categoryServer
    }

    async create(req, res, next) {
        try {
            const dto = req.body

            if (!dto.name || !dto.categoryId) {
                throw new CustomError(400, "name and categoryId are required")
            }

            if (typeof dto.count !== "undefined" && isNaN(dto.count)) {
                throw new CustomError(400, "count number emas")
            }

            if (typeof dto.price !== "undefined" && isNaN(dto.price)) {
                throw new CustomError(400, "price number emas")
            }

            await this.#categoryServer.findById(dto.categoryId)
            const resData = await this.#productServer.create(dto)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async findById(req, res, next) {
        try {
            const { id } = req.params
            const resData = await this.#productServer.findById(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const resData = await this.#productServer.findAll()
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async deleteById(req, res, next) {
        try {
            const { id } = req.params
            const resData = await this.#productServer.deleteById(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }
}

const productController = new ProductController(
    productService,
    categoryService
)

export { productController }
