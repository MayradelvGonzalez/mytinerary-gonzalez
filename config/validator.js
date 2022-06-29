const joi = require('joi');

const validator = (req, res, next) => {
    const schema = joi.object({
        mail: joi.string()
        .email({minDomainSegments:2})
        .required()
        .messages({
            'string.email':'"mail": incorrect form'
        }),
        password: joi.string()
        .min(8)
        .max(30)
        .pattern(new RegExp('[a-zA-Z0-9'))
        .required()
        .messages({
            'string.min':'"password": min 8 characters',
            'string.max':'"password": max 30 characters'
        }),
        role: joi.string()
        .required(),
        from: joi.string()
        .required()
    })
    const validation = schema.validate(req.body, {abortEarly:false})
    if(validation.error){
        return res.json({success: false, from: 'validator', message: validation.error.details, test: validation})
    }
    next()
}
module.exports = validator