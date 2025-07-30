export class ValidationError<T = Record<string, string>> extends Error {
    details: T

    constructor(details: T) {
        super('Invalid input.')
        this.name = 'ValidationError'
        this.details = details

        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}
