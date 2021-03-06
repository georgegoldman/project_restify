const errors = require('restify-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../app/models/User')
const auth = require('../auth')
const config = require('../app/lib/configs/config')

module.exports = server => {
    // register
    server.post('/register', (req, res, next) => {
        const {email, password} = req.body;

        const user = new User({
            email,
            password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                // hash password
                user.password = hash;
                // save the user
                try{
                    const newUser = await user.save();
                    res.send(201)
                    next()
                }catch(err) {
                    return next(new errors.InternalError(err.message))
                }
            })
        })
    })

    server.post('/auth', async (req, res, next) => {
        const { email, password } = req.body

        try{
            // authenticate user
            const user = await auth.authenticate(email, password)
            // create token
            const token  = jwt.sign(user.toJSON(), config.app.jwt_secret, {
                expiresIn: '15m'
            });

            const { iat, exp } = jwt.decode(token);
            res.send({iat, exp, token})
            next()
        }catch(err){
            // User unauthorized
            return next(new errors.UnauthorizedError(err))
        }
    })
}