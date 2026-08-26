import crypto from 'crypto'
import ApiError from '../../common/utils/api-Error.js'
import * as token from '../../common/utils/jwt.token.js'
import users from './auth.model.js'
import * as Email from '../../common/config/email.js'

const hashedToken = (token) =>crypto.createHash('sha256').update(token).digest('hex')

const register = async({name, email, password, role}) => {
    const existing = await users.findOne({email})

    if(existing){
        throw ApiError.existedData("Email already exist")
    }

    const {rawToken, HashedToken} = token.generateResetToken()

    const User = await users.create({
        name,
        password,
        email,
        role,
        verificationToken : HashedToken
    });

    const userObj = User.toObject()

    delete userObj.password
    delete userObj.verificationToken
    return userObj
}

const login = async(email, password) => {
    const user = await users.findOne({email}).select("+password");
    if(!user){
        throw ApiError.forbiddern("Please verify your email to proceed further")
    }

    const accessToken = token.generateRefreshToken({id: user._id})

    const refreshToken = token.generateAccessToken({id : user._id})

    user.refreshToken = hashedToken(refreshToken)

    await user.save({validateBeforeSave :false});

    const userObj = user.toObject()

    delete userObj.refreshToken

    delete userObj.password
    return {user : userObj, accessToken , refreshToken};
}

const refresh = async(refreshToken) =>{
    if(!refreshToken){
        throw ApiError.unauthorized("Refresh Token is missing")
    }

    const decode = token.verifyREFRESHToken(refreshToken);

    const user = await users.findById(decode.id).select("+refreshToken")

    if(user.refreshToken !== hashedToken(refreshToken)){
        throw ApiError.unauthorized("Invalid Token");
    }

    const accessToken = token.generateAccessToken({id : user._id, role : user.role});
    const refreshToken = token.generateRefreshToken({id : user._id})

    user.refreshToken = hashedToken(refreshToken)
    await user.save({validateBeforeSave : false});

    return {accessToken, refreshToken};
}

const logOut = async(userId) => {
    await users.findByIdAndUpdate(userId, {refreshToken : null})
}

const forgetPassword = async (email) => {
    const user = await users.findOne({email});

    if(!user) throw ApiError.noUser("No user found");

    const {rawToken, hashedToken} = token.generateResetToken();

    await Email.sendVerificationEmail(email,rawToken)

    user.ResetPasswordTOken = hashedToken

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    await user.save({validateBeforeSave :false});
}

const reSetPassword = async (rawToken) => {
    const hashed = hashedToken(rawToken)

    const user = await users.findOne({ResetPasswordTOken : hashed}).select("+Password")

    const password = "asjf;jsfas;fjj;sajkf;sfslfjhsdfsdhfs";
    user.password = hashedToken(password)

    await user.save({validateBeforeSave : false});
}

const getMe = async (userId) => {
    const user = await users.findById(userId);
    if(!user) throw ApiError.notFound("User not found")
    return user;
}

export {
    hashedToken,
    register,
    login,
    refresh,
    logOut,
    forgetPassword,
    reSetPassword,
    getMe
}