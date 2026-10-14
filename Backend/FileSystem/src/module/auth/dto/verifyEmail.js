import BaseDto from '../../../common/dto/base.dto.js'
import Joi from 'joi'

class verifyDto extends BaseDto{
    static schema = Joi.object({
        rawToken : Joi.string().required()
    })
}

export default verifyDto