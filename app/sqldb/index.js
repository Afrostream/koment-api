/**
 * Sequelize initialization module
 */
const config = require('../../config');
const Sequelize = require('sequelize');

var db = {
    Sequelize,
    sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

db.User = db.sequelize.import('./models/user');

module.exports = db;
