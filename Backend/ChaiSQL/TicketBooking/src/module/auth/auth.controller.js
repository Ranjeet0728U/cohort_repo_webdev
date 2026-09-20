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



export{
    register,
}