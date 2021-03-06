'use strict'

const config = require('../configs/config')
const serviceLocator = require('../lib/service_locator')
const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
})


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
    customers: [CustomerSchema]
},{
    timestamps: true
})

const User = mongoose.model('User', UserSchema)
module.exports = User