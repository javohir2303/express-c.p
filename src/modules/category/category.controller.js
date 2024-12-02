import {CustomError} from "../../lib/customError.js"
import {productService} from "../product/product.service.js"
import {categoryService} from "../category/category.service.js"
class CategoryController {
    #CategoryService
    constructor(CategoryService) {
        this.#CategoryService = CategoryService
    }

    async getAll(req, res, next) {
        try {
            const resData = await this.#CategoryService.getAll()
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const dto = req.body

            if (!dto.name) {
                throw new CustomError(400, "name is required")
            }

            const foundData = await this.#CategoryService.findByName(dto.name)

            if (foundData.data) {
                throw new CustomError(400, "category already exists")
            }

            const resData = await this.#CategoryService.create(dto)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }


    async findById(req, res, next) {
        try {
            const { id } = req.params
            const resData = await this.#CategoryService.findById(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }

    async deleteById(req, res, next) {
        try {
            const { id } = req.params
            const resData = await this.#CategoryService.deleteById(id)
            res.status(resData.statusCode).json(resData)
        } catch (error) {
            next(error)
        }
    }
}

const categoryContr = new CategoryController(categoryService)

export { categoryContr }

const categoryController = new CategoryController(
    productService,
    categoryService
)

export {categoryController}