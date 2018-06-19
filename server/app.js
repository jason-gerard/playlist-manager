const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// router imports
const userRoutes = require('./routes/users');
const songRoutes = require('./routes/songs');

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
app.use('/api/songs', songRoutes);

// 404 errors
app.use((req, res, next) => {
    res.status(404).json({
        error: '404 Page not found'
    });
})

module.exports = app;