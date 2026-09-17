
class ApiError extends Error{

    statusCode : number 
    isOperational : boolean

    constructor(statusCode : number, massage : string){

        super(massage)
        this.statusCode = statusCode
        
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

    static badRequest(massage : string = 'bad request'){
        throw new ApiError(400, massage)
    }

    static unauthorized(massage : string = 'unauthorized access'){
        throw new ApiError(401, massage)
    }

    static existingUser(massage : string = 'user already exists'){
        throw new ApiError(409, massage)
    }

    static forbidden(massage : string = 'user already exists'){
        throw new ApiError(412, massage)
    }

    static noUser(massage : string = 'user already exists'){
        throw new ApiError(404, massage)
    }

    static DBNotConnected(massage = "No DB Connected"){
        throw new ApiError(503, massage)
    }
}

export default ApiError