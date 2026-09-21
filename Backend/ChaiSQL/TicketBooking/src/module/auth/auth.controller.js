import * as authService from './auth.services.js'
import ApiResponse from '../../common/utils/api-respons.js'


const register = async(req, res) => {
    try{

        const user = await authService.register(req.body);
        ApiResponse.created(res, "Registration success", user)
    }catch(err){
        console.log(err.message);
    }
}

const login = async(req, res) => {
    try{
        const {refreshToken, accessToken, userObj} = await authService.login(req.body);
        
        res.cookie('accessToken', accessToken, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            maxAge : 15 * 60 * 1000 // 15 min
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            maxAge : 7* 24 * 60 * 60 * 1000 // 7days
        })
        
        ApiResponse.ok(res, 'Login Success', userObj)
    }catch(err) {
        console.log("error Login failed")
        return res.status(404).json({
            success : false,
            message : err.message
        })
    }
}



export{
    register,
    login,
}