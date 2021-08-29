'use strict'

const joi = require('joi')

module.exports = joi.object().keys({
    name: joi.string().min(5).max(60).required(),
    email: joi.string().min(5).max(60).required(),
}).required();