import * as authService from './auth.service.js'
import ApiRes from '../../common/utils/api-respons.js'
import ApiError from '../../common/utils/apiError.js';
import fs from 'node:fs'

const register = async(req, res, next) => {
    try{
        const registration  = await authService.register(req.body);
        return ApiRes.created(
            res,
            "Registration successful. Verify your email to continue.",
            registration
        )
    }catch(err){
        
        return res.status(err.statusCode || 500).json({
            success : false,
            message : err.message || "internal server error"
        })
    }
}

const verifyEmail = async(req, res) => {
    try{
        const { token } = req.params;
        const rawToken = token;
        const result = await authService.verifyEmail(rawToken)

        return ApiRes.ok(
            res,
            result.message, 
            result
        )
    }catch(err){
        return res.status(err.statusCode || 500).json({
            success : false,
            message : err.message || "internal server error"
        })
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body

        const {user, accessToken, refreshToken} = await authService.login(email, password)

        console.log("accessToken: - ", accessToken);
        console.log("RefreshToken", refreshToken);

        res.cookie("refreshToken", refreshToken, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite: "lax",
            maxAge : 7 * 24 * 60 * 60 * 1000,
        })

        res.cookie("accessToken", accessToken, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite: "lax",
            maxAge : 15 * 60 * 1000,
        })

        return ApiRes.ok(res, "login Successful", {user})
    }catch(err){
        return res.status(err.statusCode || 500).json({
            success : false,
            message : err.message || "internal server error"
        })
    }
}

const logOut = async (req, res) => {
    try{
        await authService.logOut(req.user.id);
        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");
        return ApiRes.ok(res, "LogOut Success");
    }catch(err){
        return res.status(err.statusCode || 500).json({
            success : false,
            message : err.message || "unexpected err occur"
        });
    }
}


const getMe = async (req, res) => {
    try{
        const user = await authService.getMe(req.user.id);
        return ApiRes.ok(res, "userProfile ", user);
    }catch(err){
        return res.status(err.statusCode || 500).json({
            success : false,
            message : err.message || "unexpected err occurred"
        })
    }
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

const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body || {};

        const result =
            await authService.resendVerificationEmail(email);

        return ApiRes.ok(res, result.message, result);
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Internal server error"
        });
    }
};

const uploadAvtar = async(req, res) => {
    try {
        const file = req.file;

        if(!file){
            return res.status(400).json({
                success: false,
                message: "No image uploaded"
            });
        }

        const result = await authService.avatarUpload(req.user.id, file);
        return ApiRes.ok(res, "Avatar uploaded successfully", { avatarUrl: result.url });
    } catch (err) {
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message || "Could not upload image"
        });
    }
}



export {
    register,
    verifyEmail,
    login,
    logOut,
    getMe,
    deleteUser,
    resendVerificationEmail,
    uploadAvtar,
}