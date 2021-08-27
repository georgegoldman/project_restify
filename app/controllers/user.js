'use strict'

class UserController {
    construtor(log, userService, httpStatus) {
        this.log = log;
        this.UserService = userService
        this.httpStatus = httpStatus
    }

    async create(req, res) {
        try{
            const { body } = req
            const result  = await this.userService.createUser(body)

            res.send(result)
        } catch (err) {
            this.log.error(err.message)
            res.send(err)
        }
    }

    async get(res, res) {
        try{
            const { username }  = req.params
            const result  = await this.userService.getUser(username)

            res.send(result)
        } catch (err) {
            this.log.error(err.message)
            res.send(err)
        }
    }
}

module.exports = UserController