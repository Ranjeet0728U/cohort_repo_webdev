class ApiError extends Error {
    constructor(statusCode, message, errors = null) {
        super(message);

        this.name = "ApiError";
        this.statusCode = statusCode;
        this.success = false;
        this.isOperational = true;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }

    // 400 - Bad Request
    static badRequest(message = "Bad Request") {
        throw new ApiError(400, message);
    }

    // 401 - Unauthorized
    static unauthorized(message = "Unauthorized") {
        throw new ApiError(401, message);
    }

    // 403 - Forbidden
    static forbidden(message = "Forbidden") {
        throw new ApiError(403, message);
    }

    // 404 - Not Found
    static notFound(message = "Resource Not Found") {
        throw new ApiError(404, message);
    }

    // 405 - Method Not Allowed
    static methodNotAllowed(message = "Method Not Allowed") {
        throw new ApiError(405, message);
    }

    // 408 - Request Timeout
    static requestTimeout(message = "Request Timeout") {
        throw new ApiError(408, message);
    }

    // 409 - Conflict
    static conflict(message = "Resource Already Exists") {
        throw new ApiError(409, message);
    }

    // 410 - Gone
    static gone(message = "Resource No Longer Available") {
        throw new ApiError(410, message);
    }

    // 413 - Payload Too Large
    static payloadTooLarge(message = "Payload Too Large") {
        throw new ApiError(413, message);
    }

    // 415 - Unsupported Media Type
    static unsupportedMediaType(message = "Unsupported Media Type") {
        throw new ApiError(415, message);
    }

    // 422 - Unprocessable Entity
    static unprocessableEntity(message = "Unprocessable Entity") {
        throw new ApiError(422, message);
    }

    // 429 - Too Many Requests
    static tooManyRequests(message = "Too Many Requests") {
        throw new ApiError(429, message);
    }

    // 500 - Internal Server Error
    static internalServer(message = "Internal Server Error") {
        throw new ApiError(500, message);
    }

    // 501 - Not Implemented
    static notImplemented(message = "Not Implemented") {
        throw new ApiError(501, message);
    }

    // 502 - Bad Gateway
    static badGateway(message = "Bad Gateway") {
        throw new ApiError(502, message);
    }

    // 503 - Service Unavailable
    static serviceUnavailable(message = "Service Unavailable") {
        throw new ApiError(503, message);
    }

    // 504 - Gateway Timeout
    static gatewayTimeout(message = "Gateway Timeout") {
        throw new ApiError(504, message);
    }
}

export default ApiError;

