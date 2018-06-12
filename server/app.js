const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// router imports
const userRoutes = require('./routes/users');

// inits app
const app = express();

// morgan middleware
app.use(morgan('dev'));
// body-parser middleware
app.use(bodyParser.json());
// cors middleware
app.use(cors());

// router middleware
app.use('/api/users', userRoutes);

module.exports = app;