'use strict'

require('dotenv').config();

const config = require('./app/configs/config');
const restify = require('restify');
const versioning = require('restify-url-semver')
const mongoose = require('mongoose');
const rjwt = require('restify-jwt-community')

const server = restify.createServer({
    formatters: {
        'application/json': require('./app/lib/jsend')
    }
});


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

server.listen(config.app.port, () => {
    console.log(`Server is running at ${config.app.port}`) 
})