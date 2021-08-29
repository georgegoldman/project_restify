module.exports = {
    // ENV: process.env.NODE_ENV,
    // PORT: process.env.PORT,
    // URL: process.env.BASE_URL,
    // MONGODB_URI: process.env.MONGODB_URI ,
    // JWT_SECRET: process.env.JWT_SECRET,
    app: {
        name: process.env.APP_NAME,
        port: process.env.PORT,
        env: process.env.NODE_ENV,
        url: process.env.BASE_URL,
        jwt_secret: process.env.JWT_SECRET
    },
    mongo: {
        mongo_URI: process.env.MONGODB_URI
    },
    application_logging: {
        file: process.env.LOG_PATH,
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_ENABLE_CONSOLE || true
    }
}