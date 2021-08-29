'use strict'

const joi = require('joi')

module.export = joi.object().keys({
    name: joi.string().alphanum().min(4).max(15).required(),
}).required()