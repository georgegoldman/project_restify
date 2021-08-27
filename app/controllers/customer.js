'use strict'

const serviceLocator = require('../lib/service_locator')

class CustomerController {
    constructor(log, cusomerServices, httpstatus) {
        this.log = log
        this.cusomerServices = cusomerServices
        this.httpstatus = httpstatus
    }

    async create(req, res) {
        try {
            const {body} = req
            const {username} = req.params
            const result  = await this.cusomerServices.createCustomer(name, email, balance)

            if(result instanceof Error) 
            res.send(result)
            else res.send(`${body.name}\'s customer saved succesfully!`)
        }catch(err) {
            this.log.error(err.message)
            res.send(err)
        }
    }

    async listAll(req, res) {
        try {
            const {name } = req.params
            const result = await this.cusomerServices.getCustomer(name);
            res.send(result)
        }catch (err) {
            this.log.error(err.message)
            res.send(err)
        }
    }
}

module.exports = CustomerConntroller