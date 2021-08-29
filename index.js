'use strict'

require('dotenv').config();

const config = require('./app/configs/config');
const restify = require('restify');
const versioning = require('restify-url-semver')
const joi = require('joi')

// require DI

const serviceLocator = require('./app/configs/di')
const validator = require('./app/lib/validator')
const handler = require('./app/lib/error_handler')
const routes = require('./app/routes/routes')
const logger = serviceLocator.get('logger')


// const mongoose = require('mongoose');
// const rjwt = require('restify-jwt-community')

const server = restify.createServer({
    name: config.app.name,
    version: ['1.0.0'],
    formatters: {
        'application/json': require('./app/lib/jsend')
    }
});

const Database = require('./app/configs/database')
new Database(config.mongo.mongo_URI)

//middleware

server.use(restify.plugins.bodyParser());

//protect routes
// server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }))

//set versioning and allow trailing slashes
server.pre(restify.pre.sanitizePath())
server.pre(versioning({prefix: '/'}))

// request handling parser
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())

server.use(
    restify.plugins.queryParser({
        mapParams: false
    })
)

server.use(validator.paramValidation(logger, joi))

handler.register(server)

routes.register(server, serviceLocator)

server.listen(config.app.port, () => {
    console.log(` ${config.app.name} Server is running at ${config.app.port}`) 
})