import Joi from 'joi'
class RegisterDto extends baseDto{
    static schema = Joi.object({
        name : Joi.string().trim().min(2).max(50).required(),
        password : Joi.string().min(2).max(200).messages("Password is required").required(),
        role : Joi.string().valid("customer","Seller", "Delivery Patner").default("Customer").required(),

    })
}

export default RegisterDto;