const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

router.post('/', async (req, res) => {
  const volunteer = new Volunteer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    interest: req.body.interest,
    experience: req.body.experience
  });

  try {
    const newVolunteer = await volunteer.save();
    res.status(201).json(newVolunteer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 