const Joi = require('joi');
const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const Station = mongoose.model('Station', stationSchema);

function validateStation(station) {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
  });

  return schema.validate(station);
}

exports.stationSchema = stationSchema;
exports.Station = Station;
exports.validate = validateStation;