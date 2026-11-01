import Joi from 'joi'

const playerDto = Joi.object({
    name : Joi.string()
    .min(2)
    .max(255)
    .trim()
    .required()
    .messages({
        "string.empty" : "player name is required",
        "string.min" : "player name must be at least 2 characters long",
        "string.max" : "player name must be at most 255 characters long",
        "any.required" : "player name is required",
    }),
    role : Joi.string()
    .valid('batsman', 'bowler', 'all-round')
    .required()
    .messages({
        "string.empty" : "role must be included",
        "any.only" : "role must be one of batsman, bowler, all-rounder",
        "any.required" : "Player role is required"
    }),

    teamId : Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
        "string.empty" : "team id is required",
        "string.hex" : "Invalid team id",
        "string.length" : "teamId is must be a mongoDB object id",
        "string.required" : "teamID is required"
    })
})

export default playerDto