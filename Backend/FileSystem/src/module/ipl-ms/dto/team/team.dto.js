import Joi from 'joi'

const teamDto = Joi.object({
    name : Joi.string()
    .trim()
    .min(2)
    .max(255)
    .required()
    .messages({
        "string.empty" : "team name is required",
        "string.min" : "team name must be at least 2 characters long",
        "string.max" : "team name must be at most 255 characters long",
        "any.required" : "team name is required",
    }),
    teamId : Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
        "string.empty" : "teamId name is required",
        "string.hex": "Invalid Sponser id",
        "string.length": "Sponser id must be a valid MongoDB ObjectId",
        "any.required" : "teamId name is required",
    })
})

export default teamDto