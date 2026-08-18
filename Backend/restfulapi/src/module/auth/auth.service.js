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

const login = async(email, password) => {
    const user = await users.findOne(email).select("+password")
    if(!user){
        throw new ApiError.unauthorized("Not a authorized person")
    }

    //somehow check the password

    if(!user.isVarified){
        throw new ApiError.forbidden("Please verify your email to proceed further")
    }

    const accessToken = Token.generateAccessToken({id : _id, role :role});
    const refreshToken = Token.generateRefreshToken({id: _id});

    user.refreshToken = hashedToken(refreshToken)
    await user.save({validateBeforeSave : false});

    const userObj = user.toObject();

    delete userObj.refreshToken
    delete userObj.password;

    return {user : userObj, accessToken, refreshToken};
}

const refresh = async(token) => {
    if(!token){
        throw ApiError.unauthorized("Refresh token missing");
    }
    
    const decode = Token.verifyREFRESHToken(token);

    const user = await users.findById(decode._id).select("+refreshToken");

    if(user.refreshToken !== hashedToken(token)){
        throw ApiError.unauthorized("Invalid Token");
    }

    const accessToken = Token.generateAccessToken({id :user._id, role :user.role});
    const refreshToken = Token.generateRefreshToken({id: user._id});

    user.refreshToken = hashedToken(refreshToken)
    await user.save({validateBeforeSave : false});
    return refreshToken;
}

const logOut = async (userId) => {
    await user.findByIdAndUpdate(userId, {refreshToken : null});
}

const forgetPassword = async (email) => {
    const user = await users.findOne({email});
    if(!user) throw ApiError.noUser

    const {rawToken, hashedToken} = Token.generateResetToken();
    //rawToken user ko bhej do;

    user.resetPassowordToken = hashedToken
    user.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000;

    await user.save({validateBeforeSave : false});
}

export {register, login};
