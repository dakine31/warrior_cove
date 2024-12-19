const express = require('express');
const router = express.Router();
const Program = require('../models/Program');
const auth = require('../middleware/auth');

// Get all programs (public)
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new program (protected)
router.post('/', auth, async (req, res) => {
  const program = new Program({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    benefits: req.body.benefits,
    requirements: req.body.requirements,
    schedule: req.body.schedule,
    location: req.body.location
  });

  try {
    const newProgram = await program.save();
    res.status(201).json(newProgram);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update program (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: 'Program not found' });

    Object.assign(program, req.body);
    const updatedProgram = await program.save();
    res.json(updatedProgram);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete program (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: 'Program not found' });

    await program.deleteOne();
    res.json({ message: 'Program deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 