import * as authService from './auth.service.js'
import ApiRes from '../../common/utils/api-respons.js'


const register = async(req, res, next) => {
    try{
        const user  = await authService.register(req.body);
        return ApiRes.created(res, "Registration succes", user)
    }catch(err){
        
        return res.status(err.statusCode || 500).json({
            success : false,
            message : err.message || "internal server error"
        })
    }
}

const verifyEmail = async(req,res) => {
    try{
        const { rawToken } = req.body
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
            success : true,
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

export {
    register,
    verifyEmail,
    login,
    logOut,
    getMe,
}