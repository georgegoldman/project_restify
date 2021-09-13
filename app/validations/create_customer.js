'use strict'

const Joi = require('joi')

const schema = Joi.object({
    name : Joi.string()
            .min(5)
            .max(60)
            .required(),
    email: Joi.string()
            .min(5)
            .max(60)
            .required()
})

module.exports = schema