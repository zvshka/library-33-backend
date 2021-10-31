import joi from "joi"
import joiToSwagger from "joi-to-swagger";

export const joiSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
})
export default joiToSwagger(joiSchema).swagger