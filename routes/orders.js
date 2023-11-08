const express = require('express');
const router = express.Router();
const { Order, validate } = require('../models/order');
const { Ticket, validateTicket } = require('../models/ticket');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort('-dateOrdered');
    res.send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching orders.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid order ID.' });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: 'The order with the given ID was not found.' });
    }

    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the order.' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const customerId = req.user._id;

    const existingOrder = await Order.findOne({ customer: customerId, completed: false }).exec();
    if (existingOrder) {
      return res.status(400).json({ error: 'An open order already exists for this customer.' });
    }

    const order = new Order({
      customer: customerId,
      tickets: [],
      totalAmount: 0,
      completed: false
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the order.' });
  }
});



router.put('/addTicket/:ticketId', auth, async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const userId = req.user._id;

    const order = await Order.findOne({ customer: userId, completed: false }).exec();
    if (!order) {
      return res.status(404).json({ error: 'Open order not found' });
    }

    const ticket = await Ticket.findById(ticketId).exec();
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    order.tickets.push(ticket);
    await order.save();

    res.json({ ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/removeTicket/:ticketId', auth, async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const userId = req.user._id;

    const order = await Order.findOne({ customer: userId, completed: false }).exec();
    if (!order) {
      return res.status(404).json({ error: 'Open order not found' });
    }

    const ticketIndex = order.tickets.findIndex((t) => t.toString() === ticketId);
    if (ticketIndex === -1) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const ticket = await Ticket.findById(ticketId).exec();
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    order.tickets.splice(ticketIndex, 1);
    await order.save();

    res.json({ ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;