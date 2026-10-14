import BaseDto from "../../../common/dto/base.dto";
import Joi from 'joi'

class verifyDto extends BaseDto{
    static schema = Joi.object({
        rawToken : Joi.string().required()
    })
}