'use strict'

const serviceLocator = require('../lib/service_locator')
const logger = seviceLocator.get('logger')

class Database{
    constructor(port, host, name){
        this.mongoose = serviceLocator.get('mongoose')
        this._connect(port, host, name);
    }

    _connect(port, host, name) {
        this.mongoose.Promise = global.Promise
        this.mogoose.connect(`mongodb://${host}:${port}/${name}`)
        const {connection} = this.mongoose
        connection.on('connected', () => {
            logger.info('Database Connection was Successful')
        })

        connection.on('error', (err) => {
            logger.info('Database Connection Failed'+err)
        })

        connection.on('disconnected', () => {
            logger.info('Database connection disconnected')
        })

        process.on('SIGINT', () => {
            connection.close()
            logger.info('Database Connection closed due to NodeJs process termination')

            process.exit(0)
        }
        )

        require('../models/Users')
    }
}

module.exports = Database