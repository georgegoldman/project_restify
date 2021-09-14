'use strict'

const joi = require('joi')

module.exports = joi.object().keys({
    name : joi.string().alphanum().min(4).max(30).required()
}).required();
