import * as authService from './auth.service'
import ApiRes from '../../common/utils/api-Response'


const register = async(req, res) => {
    const user  = await authService.register(req.body);
    ApiRes.created(res, "Registration succes", user)
}

const login = async (req, res) => {
    const {user, accessToken, refreshToken} = await authService.login(req.body)
    res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        maxAge : 7 * 24 * 60 * 60 * 1000,
    })

    ApiRes.ok(res, "login Successful", {user, accessToken})
}

const logOut = async (req, res) => {
    const user = await authService.logOut(req.user.id);
    res.clearCookie("refreshToken");
    ApiRes.ok(res, "LogOut Success");
}


const getMe = async (req, res) => {
    const user = await authService.getMe(req.user.id);
    ApiRes.ok(res, "userProfile ", user);
}

export {
    register,
    login,
    logOut,
    getMe,
}