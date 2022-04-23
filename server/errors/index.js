class ApplicationServiceError extends Error {
    constructor(args){
        super(args)
        this.error = "ApplicationServiceError"
        this.status = 500
    }
}

class NotFoundError extends ApplicationServiceError {
    constructor(args){
        super(args)
        this.error = "NotFoundError"
        this.status = 404
    }
}

class BadRequestError extends ApplicationServiceError {
    constructor(args){
        super(args)
        this.error = "BadRequestError"
        this.status = 400
    }
}

module.exports = {
    ApplicationServiceError,
    NotFoundError,
    BadRequestError
}