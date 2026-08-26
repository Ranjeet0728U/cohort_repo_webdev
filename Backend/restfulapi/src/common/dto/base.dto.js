import Joi from 'joi'

class BaseDto{
    static schema = Joi.object({});


    static validate(data){
        const {error, data} = this.schema.validate(data,{
            abortEarly : false,
            stripUnknown : true
        });

        if(error){
            const erros = error.details.map((d) => d.message);
            return {errors, value = null};
        }

        return {error = null, value};
        
    }
}

export default BaseDto;