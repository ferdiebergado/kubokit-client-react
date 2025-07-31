export class ValidationError<T = Record<string, string>> extends Error {
    details: T

    constructor(details: T) {
        super('Invalid input.')
        this.name = 'ValidationError'
        this.details = details

        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}

export class HTTPError extends Error {
    code: number

    constructor(message: string, code: number) {
        super(message)
        this.name = 'HTTPError'
        this.code = code

        Object.setPrototypeOf(this, HTTPError.prototype)
    }
}
