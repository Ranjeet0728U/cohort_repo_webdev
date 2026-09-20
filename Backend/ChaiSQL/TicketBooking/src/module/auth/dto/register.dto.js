import BaseDto from "../../../common/dto/baseDTO.js";
import Joi from 'joi'

class RegisterDto extends BaseDto{
    static schema = Joi.object({
        name : Joi.string().trim().min(2).max(50).required(),
        email : Joi.string().email().lowercase().required(),
        password : Joi.string().trim().message("Password must contains 6 character! ").min(6).max(255).required(),
    })
}

export default RegisterDto