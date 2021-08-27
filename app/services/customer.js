'use strict'

class CustomerServices {
    constructor (log, mongoose, httpStatus, errs) {
        this.log = log
        this.mongoose = mongoose
        this.httpStatus = httpStatus
        this.errs = errs
    }

    async createCustomer(name, email, balance){
        const User = mongoose.model('User')
        const user = await User.findOne({email})
        const {name} = body

        if(!user) {
            const err = new this.errs.NotFoundError(
                `User with username - ${name} does not exists`
            )
            return err
        }

        user.customer.push({
            name,
            eamil,
            balance
        })

        return user.save()
    }

    async getCustomer(name) {
        const Users = this.mongoose.model('Users')
        const user = await Users.findeOne({name})

        if (!user) {
            const err = new this.errs.NotFoundError(
                `user with username - ${username} does not exists`
            )

            return err
        }
        return user.customer
    }
}

module.exports = CustomerServices