class ApiError extends Error {
    constructor(
        status,
        message = "An error occurred",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.success = false;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = { ApiError };