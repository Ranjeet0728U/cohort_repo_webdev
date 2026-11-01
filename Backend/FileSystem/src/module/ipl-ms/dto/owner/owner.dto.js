import Joi from "joi";

 const OwnerDto = Joi.object({
    name : Joi.string()
            .min(2).
            max(255)
            .trim()
            .required()
            .messages({
                "string.empty" : "owner name is required",
                "string.min" : "owner name must be at least 2 characters long",
                "string.max" : "owner name must be at most 255 characters long",
                "any.required" : "owner name is required",
            }),

    company : Joi.string()
        .min(2)
        .max(255)
        .trim()
        .required()
        .messages({
            "string.empty" : "company name is required",
            "string.min" : "comapany name must be at least 2 characters long",
            "string.max" : "comapany name must be at most 255 characters long",
            "any.required" : "comapany name is required",
        }),
})

export default OwnerDto;