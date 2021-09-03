'use strict'

const config = require('../configs/config')
const serviceLocator = require('../lib/service_locator')
const mongoose = require('mongoose')
const customer  = require('./Customer')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,

    },
    customer: [customer.CustomerSchema]
})

const User = mongoose.model('User', UserSchema)
module.exports = User