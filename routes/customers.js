const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.get('/', [auth, admin], async (req, res) => {
    try {
        const customers = await Customer.find().sort('name');
        res.send(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching customers.' });
    }
});

router.get('/:id', [auth, admin], async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid customer ID.' });
        }

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({ error: 'The customer with the given ID was not found.' });
        }

        res.send(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the customer.' });
    }
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findOne({ email: req.body.email });
    if (customer) res.status(400).send('Customer already registered. ');
    customer = new Customer(_.pick(req.body, ['firstname', 'lastname', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);

    await customer.save();

    const token = customer.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(customer, ['_id', 'firstname', 'lastname', 'email']));
});

module.exports = router;