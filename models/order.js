const Joi = require('joi');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: true
    }
  ],
  completed: {
    type: Boolean,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    customer: Joi.objectId().required(),
    tickets: Joi.array().items(Joi.objectId().required()).required(),
    totalAmount: Joi.number().required(),
    completed: Joi.date().default(false).required()
  });

  return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;