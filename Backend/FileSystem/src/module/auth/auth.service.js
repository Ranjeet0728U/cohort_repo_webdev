import crypto from 'crypto'
import ApiError from '../../common/utils/apiError.js'
import * as token from '../../common/utils/jwt.token.js'
import users from './auth.model.js'
import * as Email from '../../common/config/email.js'
import bcrypt from 'bcrypt'

const hashedToken = (token) =>crypto.createHash('sha256').update(token).digest('hex')

const register = async({name, email, password, role}) => {
    if (typeof email !== "string" || !email.trim()) {
        throw ApiError.badRequest("Email is required");
    }
    email = email.trim().toLowerCase()
    
    const existing = await users.findOne({email})

    if(existing){
        throw ApiError.existingUser("Email already exist")
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const { rawToken, hashedToken: hashedVerificationToken } = token.generateResetToken();
    

    const User = await users.create({
        name,
        password :hashedPassword ,
        email,
        role,
        verificationToken : hashedVerificationToken,
        verificationTokenExpiry: new Date( Date.now() + 15 * 60 * 1000 )
    });
    

    const userObj = User.toObject()

    delete userObj.password
    delete userObj.verificationToken
    delete userObj.verificationTokenExpiry;
    delete userObj.refreshToken;
    console.log("The raw Token is : - ", rawToken)
    return userObj
}


const verifyEmail = async (rawToken) => {
    if (!rawToken || typeof rawToken !== 'string') {
        throw ApiError.badRequest("Verification token is required");
    }

    const hashed = hashedToken(rawToken);

    const user = await users.findOne({
        verificationToken: hashed,
        verificationTokenExpiry: { $gt: new Date() },
    }).select("+verificationToken +verificationTokenExpiry")

    if (!user) {
        throw ApiError.badRequest(
            "Invalid or expired verification link"
        );
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;

    await user.save({ validateBeforeSave: false });

    return {
        message: "Email verified successfully. You can now log in.",
    };
};

 
const login = async(email, password) => {
    email = email.trim().toLowerCase()

    const user = await users.findOne({email}).select("+password");

    if(!user){
        throw ApiError.forbidden("Email is not registered")
    }
    
    const isPasswordValid = await bcrypt.compare( password, user.password );
    
    if (!isPasswordValid) throw ApiError.unauthorized("Invalid email or password"); 

    if (!user.isVerified) { 
        throw ApiError.forbidden( "Please verify your email before logging in" ); 
    }
    const accessToken = token.generateAccessToken({ id: user._id }); 
    const refreshToken = token.generateRefreshToken({ id: user._id });

    console.log("access Token is : ", accessToken);
    console.log("Refresh Token is : ", refreshToken)

    user.refreshToken = hashedToken(refreshToken)

    await user.save({validateBeforeSave :false});

    const userObj = user.toObject()

    delete userObj.refreshToken
    delete userObj.password
    
    return {
        user : userObj, 
        accessToken, 
        refreshToken
    };
}

const refresh = async(refreshToken) =>{
    if(!refreshToken){
        throw ApiError.unauthorized("Refresh Token is missing")
    }

    const decode = token.verifyREFRESHToken(refreshToken);

    const user = await users.findById(decode.id).select("+refreshToken")

    if (!user || !user.refreshToken) {
        throw ApiError.unauthorized("Invalid refresh token");
    }


    if(user.refreshToken !== hashedToken(refreshToken)){
        throw ApiError.unauthorized("Invalid Token");
    }

    const accessToken = token.generateAccessToken({id : user._id, role : user.role});
    const newRefreshToken = token.generateRefreshToken({id : user._id})

    user.refreshToken = hashedToken(newRefreshToken)
    await user.save({validateBeforeSave : false});

    return {accessToken, newRefreshToken};
}

const logOut = async(userId) => {
    await users.findByIdAndUpdate(userId, {refreshToken : null})
}

const forgetPassword = async (email) => {
    const user = await users.findOne({email});

    if(!user) throw ApiError.noUser("No user found");

    const {rawToken, hashedToken} = token.generateResetToken();
    console.log("Raw Token is : - ", rawToken)

    await Email.sendVerificationEmail(email,rawToken)

    user.resetPasswordToken = hashedToken

    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000)

    await user.save({validateBeforeSave :false});
}

const reSetPassword = async (rawToken, newPassword) => {
    if(!rawToken || !newPassword) throw ApiError.badRequest("ResetToken and new Password is not provided")
    const hashed = hashedToken(rawToken)

    const user = await users.findOne({
        resetPasswordToken: hashed,
        resetPasswordExpire: { $gt: new Date() },
    });

    if(!user)throw ApiError.badRequest("user not exists")
    
    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = null,
    user.resetPasswordExpire = null
    user.refreshToken = null

    await user.save({validateBeforeSave : false});
    return {
        massage : "Password changed successfully"
    }
}

const getMe = async (userId) => {
    const user = await users.findById(userId);
    if(!user) throw ApiError.notFound("User not found")
    return user;
}

export {
    hashedToken,
    register,
    verifyEmail,
    login,
    refresh,
    logOut,
    forgetPassword,
    reSetPassword,
    getMe
}