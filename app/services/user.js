'use strict'

class UserService {
    constructor(log, mongoose, httpStatus, errs) {
        this.log = log
        this.mongoose = mongoose
        this.httpStatus = httpStatus
        this.errs = errs
    }

    async createUser(body) {
        // console.log(body)
        const User = this.mongoose.model('User')
        // console.log(User)
        const {name} = body
        const user = await User.findOne({name})
        // console.log(user)

        if(user) {
            const err = new this.errs.InvalidArgumentError(
                'User with user name alredy exists'
            )

            return err
        }

        let newUser = new User(body)
        newUser = await newUser.save()

        this.log.info('User Created Successfully')
        return newUser;
    }

    async getUser(name) {
        const User = this.mongoose.model('User')
        const user = await Users.findOne({name})

        if(!user) {
            const err = new this.errs.NotFoundError(
                `User with Username - ${name} does not exists`
            )

            return err
        }

        this.log.info('user fetched Succesfully')

        return user
    }
}

module.exports = UserService;