const restify = require('restify');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config');
const rjwt = require('restify-jwt-community')

const server = restify.createServer();


//middleware

server.use(restify.plugins.bodyParser());

//protect routes
// server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }))

server.listen(config.PORT, () => {
    mongoose.connect(
        config.MONGODB_URI,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    );
});

const db = mongoose.connection;

db.on('error', error => console.error(error));

db.once('open', () => {
    require('./routes/customers')(server);
    require('./routes/users')(server);
    console.log(`Server started on port ${config.PORT}`);
})