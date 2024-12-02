import fs from "fs/promises"

class Repository {
    #filePath
    constructor(filePath) {
        this.#filePath = filePath
    }

    async readFile() {
        try {
            const data = await fs.readFile(this.#filePath, "utf-8")
            return JSON.parse(data)
        } catch (error) {
            if (error.code === "ENOENT") {
                await this.writeFile([])
                return []
            }
            throw error
        }
    }

    async writeFile(data) {
        await fs.writeFile(this.#filePath, JSON.stringify(data, null, 2))
    }

    async writeAdd(newData) {
        const data = await this.readFile()
        data.push(newData)
        await this.writeFile(data)
    }
}

export { Repository }
