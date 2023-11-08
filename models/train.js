const Joi = require('joi');
const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  departureStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true
  },
  arrivalStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  }
});

const Train = mongoose.model('Train', trainSchema);

function validateTrain(train) {
  const schema = Joi.object({
    departureStation: Joi.objectId().required(),
    arrivalStation: Joi.objectId().required(),
    departureTime: Joi.string().required(),
    arrivalTime: Joi.string().required()
  });

  return schema.validate(train);
}

exports.Train = Train;
exports.validate = validateTrain;
