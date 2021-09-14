'use strict'

// const { customer } = require("../models/Customer")

class CustomerServices {
    constructor (log, mongoose, httpStatus, errs) {
        this.log = log
        this.mongoose = mongoose
        this.httpStatus = httpStatus
        this.errs = errs
    }

    async createCustomer(name, body){
        const User = this.mongoose.model('User')
        // const Customer = this.mongoose.model('Customer')
        const user = await User.findOne({name})
        // console.log(user)
        const {email, balance} = body
        // const name = body
        // console.log(name, email, balance)
        if(!user) {
            const err = new this.errs.NotFoundError(
                `User with username - ${name} does not exists`
            )
            return err
        }

        // const customer = new Customer({
        //     name,
        //     email,
        //     balance
        // })

        user.customers.push(body);

        return user.save()
    }

    async getCustomer(name) {
        const User = this.mongoose.model('User')
        const user = await User.findOne({name})

        if (!user) {
            const err = new this.errs.NotFoundError(
                `user with username - ${username} does not exists`
            )

            return err
        }
        return user.customers
    }
}

module.exports = CustomerServices