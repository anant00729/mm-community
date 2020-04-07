const nodeMailer = require('nodemailer')
const express = require('express')
const ejs = require('ejs')

const app = express()
let transporter = nodeMailer.createTransport({
  //host : 'smpt.ethereal.email',
  host : 'smtp.gmail.com',
  transportMethod : 'SMTP',
  port: 465,
  secure: true,
  auth : {
    user : 'anantarnav007@gmail.com',
    pass : 'AnantSAwasthy'
  }
})



app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/sendMail', (req,res)=> {

  ejs.renderFile('./public/test.ejs', (error , result) => {
    if(error){
      console.log('error', error)
      res.json(error)
    }
    const mailOptions = {
      from : 'anantarnav007@gmail.com',
      to : 'anant.awasthy29@gmail.com',
      subject : 'Test Subject',
      html : result
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if(error){
        res.json(error)
        console.log('error', error)
      }
      if(info){
        console.log('info', info)
        res.json(info)
      }
    })
  })
  
})
app.listen(8081)



  