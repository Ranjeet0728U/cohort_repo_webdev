import ApiError from "../../common/utils/apiError.js";
import {verifyAccessToken} from '../../common/utils/jwt.token.js'
import Users from './auth.model.js'

const authenticate = async (req, res, next) => {
    const authorization = req.headers.authorization;
    const token = req.cookies?.accessToken ||
        (authorization?.startsWith("Bearer ") ? authorization.slice(7) : null);

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
        email : user.email,
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