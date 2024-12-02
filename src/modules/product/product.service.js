import { Repository } from "../../lib/repository.js"
import { resolve } from "node:path"
import { ResData } from "../../lib/resData.js"
import { ProductyEntity } from "../../lib/productEntity.js"
import { CustomError } from "../../lib/customError.js"

class ProductService {
    #repository
    constructor(repository) {
        this.#repository = repository
    }

    async create(dto) {
        const newData = new ProductyEntity(
            dto.name,
            dto.categoryId,
            dto.count,
            dto.price
        )

        await this.#repository.writeAdd(newData)
        return new ResData(201, "created", newData)
    }

    async findById(id) {
        const data = await this.#repository.readFile()
        const foundData = data.find((el) => el.id === id)

        if (!foundData) {
            throw new CustomError(404, "product not found")
        }

        return new ResData(200, "success", foundData)
    }

    async findAll() {
        const data = await this.#repository.readFile()
        return new ResData(200, "success", data)
    }

    async deleteById(id) {
        const data = await this.#repository.readFile()
        const index = data.findIndex((el) => el.id === id)

        if (index === -1) {
            throw new CustomError(404, "product not found")
        }

        data.splice(index, 1)
        await this.#repository.writeFile(data)

        return new ResData(200, "deleted", { id })
    }
}

const productPath = resolve("database", "product.json")
const productRepo = new Repository(productPath)
const productService = new ProductService(productRepo)

export { productService }
