import Joi from "joi";

export const teamBroadcasterDto = Joi.object({
    teamId : Joi.string().hex().length(24).required(),
    broadcasterId : Joi.string().hex().length(24).required()
})

export default teamBroadcasterDto;