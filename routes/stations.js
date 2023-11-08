const { Station, validate } = require('../models/station');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const stations = await Station.find().sort('name');
    res.send(stations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching stations.' });
  }
});

router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let station = new Station({ name: req.body.name });
    station = await station.save();
    res.send(station);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the station.' });
  }
});

router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid station ID.' });
    }

    const station = await Station.findByIdAndRemove(id);

    if (!station) {
      return res.status(404).json({ error: 'The station with the given ID was not found.' });
    }

    res.send(station);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the station.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid station ID.' });
    }

    const station = await Station.findById(id);

    if (!station) {
      return res.status(404).json({ error: 'The station with the given ID was not found.' });
    }

    res.send(station);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the station.' });
  }
});


module.exports = router;