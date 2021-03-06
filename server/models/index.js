const Sequelize = require('sequelize');
const config = require('../config/config');
const db = {};

// config for connection
const sequelize = new Sequelize(
	config.db.database,
	config.db.user,
	config.db.password,
	config.db.options
);

// imports all models
db.User = sequelize.import(__dirname + '/user.js');
db.Song = sequelize.import(__dirname + '/song.js');

// associates all models in db
Object.keys(db).forEach(modelName => {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
