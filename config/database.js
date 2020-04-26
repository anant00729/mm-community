
const Sequelize = require('sequelize')
const config = require('config')
const dbURI = config.get('dbURI')


// /**
//  * S3 bucket storage
//  */
// const s3 = new aws.S3({
//   secretAccessKey: '+ODosrvsS4IPVH4MIOeo2Eoy6bpL0OmiMLHrVsv0',
//   accessKeyId: 'AKIAZBNIUTCYJ5PNW25W',
//   region: 'ap-south-1',
//   ACL: 'public-read'
// })

module.exports =  new Sequelize(dbURI);
