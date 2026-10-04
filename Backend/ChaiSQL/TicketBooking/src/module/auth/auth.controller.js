import * as authService from './auth.services.js'



const register = async(req, res) => {
    try{

        await authService.register(req.body);
        return res.status(201).json({
            success : true,
            message : 'registered',
            redirect : '/api/auth/login'
        })
    }catch(err){
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        });
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
        
        return res.status(200).json({
            success : true,
            message : 'Login success full',
            redirect : '/ticket/book'
        })
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