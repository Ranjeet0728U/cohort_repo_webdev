import crypto from 'crypto'
import ApiError from '../../common/utils/apiError.js'
import * as token from '../../common/utils/jwt.token.js'
import users from './auth.model.js'
import * as Email from '../../common/config/email.js'
import bcrypt from 'bcrypt'
import fs from 'node:fs'
import imagekit from '../../common/config/imagekit.js'

const hashedToken = (token) =>crypto.createHash('sha256').update(token).digest('hex')

const register = async({name, email, password, role}) => {
    if (typeof email !== "string" || !email.trim()) {
        throw ApiError.badRequest("Email is required");
    }
    if (process.env.NODE_ENV === 'production' && !process.env.SMTP_HOST) {
        throw new ApiError(503, "Email verification is not configured");
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

    if (process.env.SMTP_HOST) {
        try {
            await Email.sendVerificationEmail(email, rawToken);
        } catch (error) {
            await User.deleteOne();
            throw new ApiError(503, "Could not send the verification email. Please try again.");
        }
    }

    const userObj = User.toObject()

    delete userObj.password
    delete userObj.verificationToken
    delete userObj.verificationTokenExpiry;
    delete userObj.refreshToken;
    return {
        user: userObj,
        ...(!process.env.SMTP_HOST && process.env.NODE_ENV !== 'production'
            ? { verificationToken: rawToken }
            : {}),
    };
}


const verifyEmail = async (rawToken) => {
    if (!rawToken || typeof rawToken !== "string") {
        throw ApiError.badRequest(
            "Verification token is required"
        );
    }

    const hashed = hashedToken(rawToken);

    const user = await users.findOne({
        verificationToken: hashed,
        verificationTokenExpiry: {
            $gt: new Date()
        }
    }).select(
        "+verificationToken +verificationTokenExpiry"
    );

    if (!user) {
        throw ApiError.badRequest(
            "Invalid or expired verification token"
        );
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;

    await user.save({
        validateBeforeSave: false
    });

    return {
        message: "Email verified successfully. You can now log in."
    };
};


const login = async(email, password) => {
    email = email.trim().toLowerCase()

    const user = await users.findOne({email}).select("+password");

    if(!user){
        throw ApiError.forbidden("Email is not registered")
    }
    
    const isPasswordValid = await bcrypt.compare( password, user.password );
    
    if(!isPasswordValid) throw ApiError.unauthorized("Invalid email or password");
    if (!user.isVerified) {
        throw ApiError.forbidden("Please verify your email before logging in");
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
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        avatar: user.avatar,
        createdAt: user.createdAt,
    };
}


const deleteUser = async (req, res) => {
    try {
        const result = await authService.deleteUser(req.user.id);

        return ApiRes.ok(res, result.message);
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal server error"
        });
    }
};


const resendVerificationEmail = async (email) => {
    email = email.trim().toLowerCase();

    const user = await users.findOne({ email })
        .select("+verificationToken +verificationTokenExpiry");

    if (!user) {
        throw ApiError.noUser("User not found");
    }

    if (user.isVerified) {
        throw ApiError.badRequest("Email is already verified");
    }

    // Generate a new 6-digit token
    const { rawToken, hashedToken: hashedVerificationToken } =
        token.generateResetToken();

    // Save the new hashed token and expiry
    user.verificationToken = hashedVerificationToken;
    user.verificationTokenExpiry = new Date(
        Date.now() + 15 * 60 * 1000
    );
    console.log(rawToken)

    await user.save({ validateBeforeSave: false });

    // try {
    //     await Email.sendVerificationEmail(email, rawToken);
    // } catch (error) {
    //     throw new ApiError(
    //         503,
    //         "Failed to send verification email"
    //     );
    // }

    return {
        message: "A new verification email has been sent"
    };
};


const avatarUpload = async(userId, file) => {
    try{
        const fileStream = fs.createReadStream(file.path);

        const uploadResponse = await imagekit.files.upload({
            file : fileStream,
            fileName : file.filename,
            folder : "/Ranjeet"
        })

        const updatedUser = await users.findByIdAndUpdate(
            userId,
            {avatar : uploadResponse.url},
            {new : true}
        )

        if(!updatedUser){
            throw ApiError.noUser("user not found")
        }

        return {
            url : uploadResponse.url,
            fileId : uploadResponse.fileId
        }
    }catch(err){
        throw err;
    } finally {
        if (file.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
    }
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
    getMe,
    deleteUser,
    resendVerificationEmail,
    avatarUpload,
}