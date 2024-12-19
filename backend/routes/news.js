const express = require('express');
const router = express.Router();
const News = require('../models/News');
const auth = require('../middleware/auth');

// Get all news (public)
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create news article (protected)
router.post('/', auth, async (req, res) => {
  const news = new News({
    title: req.body.title,
    date: req.body.date,
    category: req.body.category,
    image: req.body.image,
    summary: req.body.summary,
    content: req.body.content
  });

  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (err) {
    console.error('Error saving news:', err);
    res.status(400).json({ message: err.message });
  }
});

// Update news article (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News article not found' });

    Object.assign(news, req.body);
    const updatedNews = await news.save();
    res.json(updatedNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete news article (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News article not found' });

    await news.deleteOne();
    res.json({ message: 'News article deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 