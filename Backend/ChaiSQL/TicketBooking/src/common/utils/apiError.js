class ApiError extends Error {
    constructor(statusCode, massage){
        super(massage);
        this.statusCode = statusCode;

        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(massage = "bad request"){
        throw new ApiError(400, massage);
    }

    static unauthorized(massage = 'unauthorized'){
        throw new ApiError(401, massage);
    }
    static existingUser(massage = 'Conflict'){
        throw new ApiError(409, massage);
    }
    static forbidden(massage = 'forbidden'){
        throw new ApiError(412, massage);
    }

    static noUser(massage = "No user found"){
        throw new ApiError(404, massage)
    }
    static DBNotConnected(massage = "No DB Connected"){
        throw new ApiError(503, massage)
    }
}
export default ApiError