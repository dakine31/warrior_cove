const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  interest: {
    type: String,
    enum: ['events', 'marketing', 'transportation'],
    required: true
  },
  experience: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'inactive'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Volunteer', volunteerSchema); 