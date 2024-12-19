const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

const eventRoutes = require('./routes/events');
const contactRoutes = require('./routes/contact');
const volunteerRoutes = require('./routes/volunteer');
const resourceRoutes = require('./routes/resources');
const adminRoutes = require('./routes/admin');
const programRoutes = require('./routes/programs');
const newsRoutes = require('./routes/news');

app.use('/api/events', eventRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});