'use strict'

const serviceLocator = require('../lib/service_locator');
const config  = require('./config');

serviceLocator.register('logger', () => {
    return require('../lib/logger').create(config.application_logging)
})

serviceLocator.register('httpStatus', () => {
    return require('http-status');
})

serviceLocator.register('mongoose', ()=> {
    return require('mongoose');
})

serviceLocator.register('errs', ()=> {
    return require('restify-errors')
})

serviceLocator.register('customerService', (serviceLocator) => {
    const log = serviceLocator.get('logger')
    const mongoose = serviceLocator.get('mongoose')
    const httpStatus = servicelocator.get('httpStatus')
    const errs  = serviceLocator.get('errs')
    const CustomerServices = require('../services/customer');

    return new CustomerServices(log, mongoose, httpStatus, errs)
})

serviceLocator.register('userService', (serviceLocator) => {
    const log = serviceLocator.get('logger')
    const mongoose = serviceLocator.get('mongoose')
    const httpStatus = serviceLocator.get('httpStatus')
    const errs = serviceLocator.get('errs');
    const UserService = require('../services/user')

    return new UserService(log, mongoose, httpStatus, errs)
})

serviceLocator.register('customerController', (serviceLocator) => {
    const log = serviceLocator.get('logger')
    const httpStatus = serviceLocator.get('httpStatus')
    const customerService = serviceLocator.get('customerService')
    const CustomerController = require('../controllers/customer')

    return new CustomerController(log, customerService, httpStatus)
})

serviceLocator.register('userController', (serviceLocator) => {
    const log = serviceLocator.get('logger')
    const httpStatus = serviceLocator.get('httpStatus')
    const userService = serviceLocator.get('userService')
    const UserController = require('../controllers/user')

    return new UserController(log, userService, httpStatus)
})

module.exports = serviceLocator;