import BaseDto from "../../../common/dto/baseDTO";
import Joi from 'joi'

class RegisterDto extends BaseDto{
    static schema = Joi.object({
        name : Joi.string().trim().min(2).max(50).required(),
        password : Joi.string().message("Password must contains 6 character! ").trim().min(6).max(255).required(),
        role : Joi.string().valid("customer", 'seller').default('customer')
    })
}

export default RegisterDto