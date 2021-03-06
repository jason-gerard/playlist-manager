const http = require('http');
const app = require('./app');

// imports config file
const config = require('./config/config');

// imports all models
const { sequelize } = require('./models')

// creates server
const server = http.createServer(app);

// opens port and syncs sequelize with db
let db = sequelize.authenticate()
    .then(() => {
        server.listen(config.port);
        console.log(`Server started on port ${config.port}`);
    })
    .catch(error => {
        console.log(`Unable to connect to db: ${error}`);
    })
    .done();