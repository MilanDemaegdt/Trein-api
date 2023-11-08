const { Train, validate } = require('../models/train');
const { Station } = require('../models/station');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

router.get('/getall', async (req, res) => {
    try {
        const trains = await Train.find().sort('name');
        res.send(trains);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { departureStation, arrivalStation, departureTime, arrivalTime } = req.body;

        const train = new Train({
            departureStation,
            arrivalStation,
            departureTime,
            arrivalTime
        });

        await train.save();
        res.send(train);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send('Invalid train ID.');
    }

    try {
        const train = await Train.findByIdAndRemove(id);
        if (!train) return res.status(404).send('The train with the given ID was not found.');
        res.send(train);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send('Invalid train ID.');
    }

    try {
        const train = await Train.findById(id);
        if (!train) return res.status(404).send('The train with the given ID was not found.');
        res.send(train);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



router.get('/', async (req, res) => {
    const { departureStation, arrivalStation } = req.query;
    if (!departureStation || !arrivalStation) {
        return res.status(400).send('Both departureStation and arrivalStation are required.');
    }

    try {
        const departure = await Station.findOne({ name: departureStation });
        const arrival = await Station.findOne({ name: arrivalStation });

        if (!departure || !arrival) {
            return res.status(404).send('One or both of the stations were not found.');
        }

        const trains = await Train.find({
            departureStation: departure._id,
            arrivalStation: arrival._id
        });

        res.json(trains);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router; 