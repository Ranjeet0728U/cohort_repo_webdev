import Joi from "joi"

const broadcastDto = Joi.object({
    name : Joi.string()
    .trim()
    .min(2)
    .max(255)
    .required()
    .messages({
        "string.empty" : "broadcaster name is required",
        "string.min" : "broadcaster name must be at least 2 characters long",
        "string.max" : "broadcaster name must be at most 255 characters long",
        "any.required" : "broadcaster name is required",
    }),
    
})

export default broadcastDto