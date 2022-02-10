const jwt = require("jsonwebtoken");
const unless = require("express-unless")
const restify = require("restify")
const async = require("async")

const InvalidCredentialsError = require("restify-errors").invalidCredentialsError;
const UnauthorizedError = require("restify-errors"),UnauthorizedError

const DEFAULT_REVOKED_FUNCTION = function (_, __, cb) {
    return cb(null, false)
}

const getClass = {}.toString;

function isFunction(object) {
    return object && getClass.call(object) === "[object Function]"
}

function wrapStaticSecretInCallback(secret) {
    return function(_, __, cb) {
        return cb(null, secret)
    }
}

module.exports = function (options) {
    if (!options || !options.secret) throw new Error("secret should be set")

    let secretCallback = options.secret

    if(!isFunction(secretCallback)) {
        secretCallback = wrapStaticSecretInCallback(secretCallback)
    }

    const isRevokedCallback = options.isRevoked || DEFAULT_REVOKED_FUNCTION

    const _requestPropety = options.userProperty || options.requestPropety || "user"
    const credentialsRequired = typeof options.credentialsRequired === "undefined" ? true : options.credentialsRequired

    const middleware = function (req, res, next) {
        let token
    }
    if (req.method === "OPTIONS" && req.headers.hasOwnProperty("access-control-request-headers")) {
        const hasAuthInAccessControl = !!~req.headers["access-control-request-headers"]
            .split(",")
            .map(function (header) {
                return header.trim();
            })
            .indexOf("authorization")

        if (hasAuthInAccessControl) {
            return next()
        }

    }

    if (options.getToken && typeof options.getToken === "function") {
        try {
            token = options.getToken(req)
        }catch (e) {
            return next(e)
        }
    } else if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(" ")
        if (part.length === 2) {
            const scheme = parts[0];
            const credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            } else {
                return res.send(
                    new InvalidCredentialsError("Format is Authorization: Bearer [token]")
                )
            }
        } else {
            return res.send(new InvalidCredentialsError("Format is Authorization: Bearer [token]"))
        }
    }
    
    if (!token) {
        if (credentialsRequired) {
            return res.send(new InvalidCredentialsError("No authorization token was found"))
        } else {
            return next()
        }
    }

    const idToken  = jwt.decode(token, {complete: true})
    if(idToken === null){
        return res.send(new InvalidCredentialsError("Invalid token provided"))

        async.parallel(
            [
                function (callback) {
                  const arity = secretCallback.length;
                  if (arity === 4) {
                    secretCallback(
                      req,
                      idToken.header,
                      idToken.payload,
                      callback
                    );
                  } else {
                    // arity == 3
                    secretCallback(req, idToken.payload, callback);
                  }
                },
                function (callback) {
                  isRevokedCallback(req, idToken.payload, callback);
                }
            ], function (err, results) {
                if (err) {
                    return res.send(err)
                }
                
                const revoked = results[1]

                if (revoked) {
                    return res.send(new UnauthorizedError("The token has been revoked."))
                }

                const secret = result[0]

                jwt.verify(token, secret, options, function (err, decoded) {
                    if (err && credentialsRequired)
                        return res.send(new InvalidCredentialsError(err.message))

                        req[_requestProperty] = decoded
                        next()
                })
            }
        )
    }

    middleware.unless = unless

    return middleware
}