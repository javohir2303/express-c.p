import { v4 as uuidv4 } from "uuid"

class ProductyEntity {
    constructor(name, categoryId, count, price) {
        this.id = uuidv4()
        this.name = name
        this.categoryId = categoryId
        this.count = count || 0
        this.price = price || 0
    }
}

export { ProductyEntity }
