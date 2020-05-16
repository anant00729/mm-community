const nodeMailer = require('nodemailer')
const config = require('config')
const user = process.env.EMAIL_ADDRESS || config.get('user')
const pass = process.env.EMAIL_PASSWORD || config.get('pass')


let transporter = nodeMailer.createTransport({
  host : 'smtp.gmail.com',
  transportMethod : 'SMTP',
  port: 465,
  secure: true,
  auth : {user , pass }
})


module.exports = transporter;