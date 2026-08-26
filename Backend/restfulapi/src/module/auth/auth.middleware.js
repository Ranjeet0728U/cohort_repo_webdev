import ApiError from "../../common/utils/api-Error.js";
import {verifyAccessToken} from '../../common/utils/jwt.token.js'
import Users from './auth.model.js'

const authenticate = async (req, res, next) => {
    let token;
    if(req.headers.authorization?.startWith("Bearer")) {
        token = req.headers.authorization.split(" "[1])
    }

    if(!token){
        throw ApiError.unauthorized("Not authenticated")
    }
    const decode = verifyAccessToken(token);

    const user = await Users.findById(decode.id)
    if(!user) throw ApiError.unauthorized("User no longer logged in")

    req.user = {
        id : user._id,
        role : user.role,
        name : user.name,
        email : user.name,
    }

    next();
}


const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            throw ApiError.forbidden(
                "Don't have permission to perform action"
            );
        }
        next();
    };
};

export { authenticate, authorize };