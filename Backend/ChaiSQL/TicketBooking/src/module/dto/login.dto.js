import BaseDto from '../../common/dto/baseDTO.js'
import Joi from 'joi'

class loginDto extends BaseDto {
    static schema = Joi.object({
        email : Joi.string().email().lowercase().required(),
        password : Joi.string().required()
    })
}


export default loginDto