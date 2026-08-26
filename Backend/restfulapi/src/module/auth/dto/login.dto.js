import baseDto from '../../common/dto/base.dto.js'
import Joi from 'joi'

class loginDto extends baseDto{
    static schema = Joi.object({
        email : Joi.string().email().lowercase().required(),
        password : Joi.string().required(),
    })
}

export default loginDto