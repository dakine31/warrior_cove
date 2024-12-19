const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:filename', (req, res) => {
  const pdfPath = path.join(__dirname, '../resources/pdf', req.params.filename);
  res.download(pdfPath, req.params.filename, (err) => {
    if (err) {
      console.error('Error downloading PDF:', err);
      res.status(404).json({ message: 'PDF not found' });
    }
  });
});

module.exports = router; 