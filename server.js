const nodeMailer = require('nodemailer')
const express = require('express')
const ejs = require('ejs')
const moment = require('moment')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const FormData = require('form-data');




const uploadImageToImgUr = async (base64) => {

  let uploadRes = {}

  const form = new FormData()
  form.append('image' , base64)
  try {

    const res_d = await fetch('https://api.imgur.com/3/upload', 
    { 
      method: 'POST', 
      body: form,
      headers : { 'Authorization': 'Client-Id 20317a5496712ab' } 
    })

    const resData = await res_d.json()

    if(resData.status === 200){
      if(resData.data.link){
        uploadRes = {status : true , imgUrl : resData.data.link}
      }else {
        uploadRes = {status : false , message : `Image URL not found`}
      }
    }else {
      uploadRes = {status : false , message : `Image not uploaded to imgur ${resData.status}`}
    }
  } catch (error) {
    uploadRes = {status : false , message : error.message}
  }
  return uploadRes
}


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}




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

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())




app.set('view engine', 'ejs')
app.use(express.static('public'))


app.post('/uploadImage' , async (req,res)=> {
  const image = req.body.imageUrl 
  const data = await uploadImageToImgUr(image)
  res.json(data)
})

app.get('/sendMail', (req,res)=> {
  const _path = `${__dirname}/public/test.ejs`
  const userTemplate = {
    name : 'Sumit'
  }
  ejs.renderFile(_path, {userTemplate} , (error , result) => {
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


app.use(express.static('public/build'));
app.use(express.static('public'));


app.get('/test', (req,res)=> {
  res.json({statsU : true})
})




app.get('*', (req,res)=> {
    ///app.use(express.static('public/build'))
    //res.sendFile(path.join(__dirname+'/public/build/index.html'));
    
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'))
    //res.sendFile(path.resolve(__dirname, 'public/build', 'index.html'))
})



const PORT = process.env.PORT || 80
app.listen(PORT, ()=>console.log(`The App is running on PORT ${PORT}`))



  