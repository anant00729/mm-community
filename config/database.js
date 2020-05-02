
const Sequelize = require('sequelize')
const config = require('config')
const dbURI = config.get('dbURI')

module.exports =  new Sequelize(dbURI);
