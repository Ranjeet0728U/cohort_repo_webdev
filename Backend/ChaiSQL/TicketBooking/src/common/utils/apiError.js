class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);

        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = "Bad request") {
        throw new ApiError(400, message);
    }

    static unauthorized(message = "Unauthorized") {
        throw new ApiError(401, message);
    }

    static existingUser(message = "User already exists") {
        throw new ApiError(409, message);
    }

    static forbidden(message = "Forbidden") {
        throw new ApiError(403, message);
    }

    static noUser(message = "No user found") {
        throw new ApiError(404, message);
    }

    static conflict(message = "User already exists") {
        throw new ApiError(409, message);
    }

    static DBNotConnected(message = "Database not connected") {
        throw new ApiError(503, message);
    }
}

export default ApiError;