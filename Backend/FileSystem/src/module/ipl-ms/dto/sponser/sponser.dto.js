import Joi from "joi"

const sponserDto = Joi.object({
    name : Joi.string()
    .min(2)
    .max(255)
    .required()
    .trim()
    .messages({
        "message.empty" : "sponser name is required",
        "name.min" : "sponser name is at least have 2 character",
        "name.max" : "sponser name is must within 255 character",
        "massage.required" : "Sponser name is required"
    })
})


export default sponserDto