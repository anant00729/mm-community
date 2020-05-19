
const Sequelize = require('sequelize')
const config = require('config')
const dbURI =  process.env.DB_URI || config.get('dbURI')
module.exports =  new Sequelize(dbURI);
