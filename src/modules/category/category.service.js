import {Repository} from "../../lib/repository.js"
import {resolve} from "node:path"
import {ResData} from "../../lib/resData.js"
import {CategoryEntity} from "../../lib/categoryEntity.js"
class CategoryService {
    #repository
    constructor(repository) {
        this.#repository = repository
    }

    async getAll() {
        const data = await this.#repository.read()
        return new ResData(200, "success", data)
    }

    async create(dto) {
        const newCategory = new CategoryEntity(dto.name)
        await this.#repository.writeAdd(newCategory)
        return new ResData(201, "created", newCategory)
    }

    async findByName(name) {
        const data = await this.#repository.readFile()
        const foundData = data.find((el) => el.name === name)
        const resData = new ResData(200, "success", foundData)

        if (!foundData) {
            resData.statusCode = 404
            resData.message = "not found"
        }

        return resData
    }

    async findById(id) {
        const data = await this.#repository.readFile()
        const foundData = data.find((el) => el.id === id)

        if (!foundData) {
            throw new CustomError(404, "category not found")
        }

        return new ResData(200, "success", foundData)
    }


    async deleteById(id) {
        const data = await this.#repository.readFile()
        const index = data.findIndex((el) => el.id === id)

        if (index === -1) {
            throw new CustomError(404, "category not found")
        }

        data.splice(index, 1)
        await this.#repository.writeFile(data)

        return new ResData(200, "deleted", { id })
    }
}

const categoryPath = resolve("database", "category.json")
const categoryRepo = new Repository(categoryPath)
const categoryService = new CategoryService(categoryRepo)

export {categoryService}