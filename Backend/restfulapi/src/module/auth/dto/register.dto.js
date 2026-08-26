import Joi, { extend } from 'joi'
import basedto from '../../../common/dto/base.dto.js'
import user from '../../user.role.js'

export class RegisterDto extends basedto{
    static schema = Joi.object({
        name : Joi.string().trim().min(2).max(50).required(),
        password : Joi.string().min(6).max(200).message("Password is required").required(),
        role : Joi.string().valid(...userRole).required(),
    })
}