import * as Token from '../../common/utils/jwt.token'
import users from './auth.model'
import ApiError from '../../common/utils/apiError'

const hashedToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const register = async({name, email, password, role}) =>{
    const existing = await users.find(email)
    if(existing){
        throw new ApiError("Email already registered")
    }
    const {rawToken, HashedToken} = generateRestToken();
    
    const User = await usesr.create({
        name,
        password,
        email,
        role,
        verificationToken :HashedToken
    });
    
    const userObj = User.toObject();
    delete userObj.password
    delete userObj.verificationToken
    return userObj;

}

const login = (email, password) => {
    const user = await users.findOne(email).select("+password")
    if(!user){
        throw new ApiError.unauthorized("Not a authorized person")
    }

    //somehow check the password

    if(!user.isVarified){
        throw new ApiError.forbidden("Please verify your email to proceed further");
    }

    const accessToken = Token.generateAccessToken({id : _id, role :role});
    const refreshToken = Token.generateRefreshToken({id: _id});

    user.refreshToken = hashedToken(refreshToken)
    await user.save({validateBeforeSave : false});

    const userObj = user.toObject;

    userObj.delete(refreshToken);
    userObj.delete(password);

    return {user : userObj, accessToken, refreshToken};
}

export {register, login};
