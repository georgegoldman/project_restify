'use strict'

const {createLogger, format, transports} = require('winston')
const {combine, timestamp, label, prettyPrint} = format;

const createTransports = function (config) {
    const customerTransports = [];

    if (config.file) {
        customerTransports.push(
            new transports.File({
                filename: config.file,
                level: config.level
            })
        )
    }
    
    if (config.console) {
        customerTransports.push(
            new transports.Console({
                level: config.level
            })
        )
    }

    return customerTransports;
}

module.exports = {
    create: function (config) {
        return createLogger({
            transports: createTransports(config),
            format: combine(
                label({label: 'Restify API'}),
                timestamp(),
                prettyPrint()
            )
        })
    }
}
