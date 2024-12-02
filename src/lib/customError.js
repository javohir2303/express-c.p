class CustomError extends Error{
    constructor(statusCode, massage){
        super(massage)
        this.statusCode = statusCode
    }
}

export {CustomError}