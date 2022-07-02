const joi = require('joi');

const validator = (req, res, next) => {
    const schema = joi.object({
        fullName: joi.string()
            .min(3)
            .max(30)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': 'fullName: min 3 characters',
                'string.max': 'fullName: max 30 characters',}),
        email: joi.string()
        .email({minDomainSegments:2})
        .required()
        .messages({
            'string.email':'"mail": incorrect form'
        }),
        password: joi.string()
        .min(8)
        .max(40)
        .pattern(new RegExp('[a-zA-Z0-9]'))
        .required()
        .messages({
            'string.min':'"password": min 8 characters',
            'string.max':'"password": max 30 characters'
        }),
        photo: joi.string()
            .min(4)
            .trim()
            .required(),

        country: joi.string()
        .required(),

        
        
       
        from: joi.string()
        
    })
    const validation = schema.validate(req.body.userData, {abortEarly:false})
    if(validation.error){
        return res.json({success: false, from: 'validator', message: validation.error.details, test: validation})
    }
    next()
}
module.exports = validator