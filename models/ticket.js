const Joi = require('joi');
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true
  },
  seatNumber: {
    type: String,
    required: true
  },
  dateOfTravel: {
    type: String,
    required: true
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

function validateTicket(ticket) {
  const schema = Joi.object({
    trainId: Joi.objectId().required(),
    seatNumber: Joi.string().required(),
    dateOfTravel: Joi.string().required()
  });

  return schema.validate(ticket);
}

exports.Ticket = Ticket;
exports.validate = validateTicket;
