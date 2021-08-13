const restify = require('restify');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./config');

const server = restify.createServer();


//middleware

server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
    mongoose.connect(
        config.MONGODB_URI,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
});

const db = mongoose.connection;

db.on('error', error => console.error(error));

db.once('open', () => {
    require('./routes/customers')(server)
    console.log(`Server started on port ${config.PORT}`);
})