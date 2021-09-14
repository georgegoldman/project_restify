'use strict'

module.exports.register = (server, serviceLocator) => {

    server.post(
        {
            path: '/user',
            name: 'Create User',
            version: '1.0.0',
            validation: {
                body: require('../validations/create_user')
            }
        },
        (req, res, next) =>
            serviceLocator.get('userController').create(req, res, next)
    )

    server.get(
        {
            path: '/customer/:name',
            name: 'Get Customer',
            version: '1.0.0',
            validation: {
                params: require('../validations/get_customer')
            }
        }, 
        (req, res, next) =>
            serviceLocator.get('customerController').listAll(req, res, next)
    )

    server.post(
        {
            path: '/customer/:name',
            name: 'Create customer',
            version: '1.0.0',
            validation: {
                body: require('../validations/create_customer')
            }
        },
        (req, res, next) => 
            serviceLocator.get('customerController').create(req, res, next)
    )
}