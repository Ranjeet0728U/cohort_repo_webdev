import Joi from "joi";

export const teamSponserDto = Joi.object({
    teamId : Joi.string().hex().length(24).required(),
    sponserId : Joi.string().hex().length(24).required()
})

export default teamSponserDto;