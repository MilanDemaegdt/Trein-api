const { Ticket, validate } = require('../models/ticket');
const { Train } = require('../models/train');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching tickets.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid ticket ID.' });
        }

        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found.' });
        }
        res.json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the ticket.' });
    }
});


router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { trainId, seatNumber, dateOfTravel } = req.body;

        const train = await Train.findById(trainId);
        if (!train) {
            return res.status(404).send('Train not found');
        }

        const ticket = new Ticket({
            trainId,
            seatNumber,
            dateOfTravel
        });

        await ticket.save();
        res.send(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.delete('/:id', [auth, admin], async (req, res) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send('Invalid ticket ID.');
    }

    try {
        const ticket = await Ticket.findByIdAndRemove(id);
        if (!ticket) return res.status(404).send('The ticket with the given ID was not found.');
        res.send(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router; 