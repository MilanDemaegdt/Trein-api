const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const app = express();
const auth = require('./routes/auth');
const customers = require('./routes/customers')
const trains = require('./routes/trains')
const stations = require('./routes/stations')
const tickets = require('./routes/tickets')
const orders = require('./routes/orders')
const privateKey = process.env.jwtPrivateKey;
const mongodb = process.env.mongodb;
const path = require('path');


if (!privateKey) {
  console.error('FATAL ERROR: jwtPrivateKey not defined in environment variables');
  process.exit(1);
}

app.get('/tester', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index2.html'));
});


mongoose.connect(mongodb)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/trains', trains);
app.use('/api/customers', customers);
app.use('/api/stations', stations);
app.use('/api/tickets', tickets);
app.use('/api/orders', orders);
app.use('/api/auth', auth);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));