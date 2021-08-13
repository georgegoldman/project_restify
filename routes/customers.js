const errors = require('restify-errors');
const Customer = require('../models/Customer')

module.exports = (server) => {
    //get customers
    server.get('/customers', async (req, res, next) => {
        try {
            const customers = await Customer.find({});
            res.send(customers);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    // get a customer
    server.get('/customer/:id', async (req, res, next) => {
        const id = req.params.id;
        try {
            const customer = await Customer.findById(id);
            res.send(customer);
            next();
        } catch (err) {
            return next(new Error.ResourceNotFoundError(`there is no customer with the id of ${id}`));
        }
    })

    // add customer
    server.post('/customers', async (req, res, next) => {
        // check for json
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("expects 'application/json'"));
        }

        const { name, email, balance } = req.body;

        const customer = new Customer({
            name,
            email,
            balance 
        })

        try {
            const newCustomer = await customer.save();
            res.send(201);
            next();
        }catch(err) {
            return next(new errors.InternalError(err.message))
        }

    });

    // update customer
    server.put('/customer/:id', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("expects 'application/json'"));
        }
        const id = req.params.id;
        try {
            const customer = await Customer.findOneAndUpdate({ _id: id}, req.body);
            res.send(200);
            next()
        }catch (err) {
            return next(
                new errors.ResourceNotFoundError(
                    `there is no customer with this id ${id}`
                )
            );
        }
    });

    // delete user
    server.del('/customer/:id', async (req, res, next) => {

        const id = req.params.id
        try{
            const customer = await Customer.findOneAndDelete({ _id: id });
            res.send(204)
            next()
        }catch (err){
            return next(
                new errors.ResourceNotFoundError(
                    `there is no customer with this id ${id}`
                )
            );
        }
    })
};