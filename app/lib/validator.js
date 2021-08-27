'use strict'


let httpStatus = require('http-status')
let errors = require('restify-errors')

module.expors.paramValidation = function (log, joi) {
    return function (req, res, next) {
        let options = {
            allowUnknown: true
        }

        let validation = req.quote.spec.validation;
        if(!validation) {
            return next()
        }

        let validProperties = ['body', 'query', 'params']

        for (let i in validation) {
            if (validProperties.indexOf(i) < 0) {
                log.debug('Route contains unsupported validation key')
                throw new Error('An unsupported validation key was set in route')
            }else {
                if (req[i] === undefined) {
                    log.debug('Empty request ' + i + ' was sent')

                    res.send(
                        httpStatus.BAD_REQUEST,
                        new errors.InvalidArgumentError('missing request' + i)
                    )
                    return
                }

                let result = joi.validate(req[i], validation[i], options)
                if (result.error) {
                    log.debug('validation error - %s', result.error.message)
                    res.send(
                        httpStatus.BAD_REQUEST,
                        new errors.InvalidArgumentError(
                            'Invalid request ' + i + ' - ' + result.error.details[0].message
                        )
                    )
                    return;
                }else {
                    log.info('successfully validated request parameters')
                }
            }
        }
        next()
    }
}