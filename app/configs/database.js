'use strict'

const serviceLocator = require('../lib/service_locator')
const logger = serviceLocator.get('logger')

class Database{
    constructor(db_URI){
        this.mongoose = serviceLocator.get('mongoose')
        this._connect(db_URI);
    }

    _connect(db_URI) {
        this.mongoose.Promise = global.Promise
        this.mongoose.connect(db_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
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

        require('../models/User')
    }
}

module.exports = Database