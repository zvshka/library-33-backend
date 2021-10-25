import joi from "joi"
import joiToSwagger from "joi-to-swagger";

export const joiSchema = joi.object().keys({
    mode: joi.string().required(),
    email: joi.string().email()
})
export default joiToSwagger(joiSchema).swagger