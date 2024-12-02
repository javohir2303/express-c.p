import {generateID} from "./generateId.js"

class CategoryEntity {
    constructor(name) {
        this.id = generateID()
        this.name = name
    }
}


export {CategoryEntity}