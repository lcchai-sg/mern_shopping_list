const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

const items = require('./routes/api/items');

const app = express();
const PORT = process.env_PORT || 5000;

// middleware
app.use(express.json());

// connect to mongo
mongoose.connect(config.dbconn, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// use routes
app.use('/api/items', items);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));