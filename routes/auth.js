const Joi = require('joi');
const bcrypt = require('bcrypt');
const { Customer } = require('../models/customer');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = await Customer.findOne({ email: req.body.email });
  if (!customer) res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, customer.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token = customer.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).email().required(),
    password: Joi.string().min(5).max(255).required()
  });
  return schema.validate(req);
}
module.exports = router;