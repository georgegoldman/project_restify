'use strict'


let httpStatus = require('http-status');
let errors = require('restify-errors');

/**
 * Header validation middleware definition
 *
 * @param log an instance of the console logger
 * @returns {Function} matching Restify middleware interface
 */

module.exports.headerValidation = function (log) {
    return function (req, res, next) {

        let headerValidation = req.route.accept;
        if(!headerValidation) {
            return next()
        }

        if (!headerValidation) {
            return next()
        }
        if (req.headers['content-type'].indexOf(req.route.accepts) === 0 ) {
            log.debug('request content-type correct - ', req.headers['content-type']);

            return next();
        } else {
            log.error('request content-type incorrect - ', req.headers['content-type']);

            res.send(
                httpStatus.BAD_GATEWAY,
                new error.InvalidContentTypeError(
                    'Invalid content-type - expecting' + req.route.accepts
                )
            )
        }
    }
}

/**
 * Route Parameter validation middleware
 *
 * @param log an instance of the console logger
 * @param joi an instance of the joi schema validator
 * @returns {Function}
 */

module.exports.paramValidation = function(log, joi) {
    return function (req, res, next) {
        let options = {
            allowUnknown: true
        }

        let validProperties = ['body', 'query', 'params']

        for (let i in validation) {
            if (validProperties.indexOf(i) < 0 ) {
                log.debug('Route contains unsupported validation key')
            } else {
                if (req[i] === undefined) {
                    log.debug('Empty request ' + i + ' was sent')

                    res.send(
                        httpStatus.BAD_REQUEST,
                        new errors.InvalidParamError('Missing request ' + i)
                    )
                    return;
                }

                let result = joi.validate(req[i], validate[i], options)

                if (result.error) {
                    log.debug('validation error - %s', result.error.message)

                    res.send(
                        httpStatus.BAD_REQUEST,
                        new error.InvalidParamError(
                            'Invalid request ' + i + ' - ' + result.error.details[0].message
                        )
                    )

                    return;
                } else {
                    log.info('successfully validated request parameters');
                }
            }
        }
        next();
    }
}