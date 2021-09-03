'use strict'

const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string()
            .alphanum()
            .min(4)
            .max(15)
            .required()
})

module.export = schema