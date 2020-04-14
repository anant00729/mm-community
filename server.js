const nodeMailer = require('nodemailer')
const express = require('express')
const db = require('./config/database')
const ejs = require('ejs')
const cors = require('cors')
const bodyParser = require('body-parser')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const multer = require('multer')
const path = require('path')





// Authenticate DB 
db.authenticate()
.then(() => {
  console.log('^^%&%^&^%^$%^&$%%^$%^$^ Wolla Connected to DB ^^%&%^&^%^$%^&$%%^$%^$^')})
.catch(err=> {
  console.log(`DB Connection failed ${err.message}`)})

/**
 * S3 bucket storage
 */
//const express = require('express')
//const url = require('url')
const s3 = new aws.S3({
  secretAccessKey: '+ODosrvsS4IPVH4MIOeo2Eoy6bpL0OmiMLHrVsv0',
  accessKeyId: 'AKIAZBNIUTCYJ5PNW25W',
  region: 'ap-south-1',
  ACL: 'public-read'
})

//aws.config.update()


const fileFilter  = (req,file ,cb) => {
  if (file.mimetype === "image/jpeg" || 
    file.mimetype === "image/jpg" || 
    file.mimetype === "image/png" || 
    file.mimetype === "video/mp4" || 
    file.mimetype === 'application/octet-stream') {
      cb(null, true);
    } else {
      cb(new Error('Invalid Mime Type, only JPEG or JPG or PNG'), false);
    }
}
// const storage = multer.diskStorage({
//   // destination : (req,file, cb) => {
//   //   cb(null, './public/uploads/')
//   // },
//   // filename : (req, file , cb) => {
//   //   cb(null, new Date ().toISOString() + file.originalname)
//   // }
// })

let uploadS3 = multer({
  fileFilter , storage : multerS3({s3 , 
  bucket : 'mm-blog-community' , 
  size : 1024 * 1024 * 10, 
  metadata : (req,file,cb) => {
    cb(null, {fieldName : file.fieldname })
  },
  key : (req , file , cb ) => {
    cb(null, new Date ().toISOString() + file.originalname)
  },
  contentType : multerS3.AUTO_CONTENT_TYPE
})
})

const app = express() 



app.post('/uploadImage' , uploadS3.single('image'), async (req,res)=> {
  console.log('req.file', req.file)
  //const image = req.body.imageUrl 
  res.json({status : true , filePath : req.file.location, fileName : req.file.key})
})


//const upload = multer({storage})


let transporter = nodeMailer.createTransport({
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

//app.use(database)

app.use('/v1/auth', require('./v1/auth/routes/authRoute'))


// app.get('/testDatabase', async (req, res, next) => {
//   try {
//     const result = await db.query('SELECT * FROM public."Article"' )  
//     res.json({status : true, data : result[0]})
//   } catch (error) {
//     res.json({status : false, message : error.message})
//   }
// })


// app.get('/sendMail', (req,res)=> {
//   const _path = `${__dirname}/public/test.ejs`
//   const userTemplate = {
//     name : 'Sumit'
//   }
//   ejs.renderFile(_path, {userTemplate} , (error , result) => {
//     if(error){
//       console.log('error', error)
//       res.json(error)
//     }
//     const mailOptions = {
//       from : 'anantarnav007@gmail.com',
//       to : 'anant.awasthy29@gmail.com',
//       subject : 'Test Subject',
//       html : result
//     }
//     transporter.sendMail(mailOptions, (error, info) => {
//       if(error){
//         res.json(error)
//         console.log('error', error)
//       }
//       if(info){
//         console.log('info', info)
//         res.json(info)
//       }
//     })
//   })
  
// })
app.use(express.static('public/build'));
app.use(express.static('public'));
app.get('*', (req,res)=> {
    ///app.use(express.static('public/build'))
    //res.sendFile(path.join(__dirname+'/public/build/index.html'));
    
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'))
    //res.sendFile(path.resolve(__dirname, 'public/build', 'index.html'))
})
const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>console.log(`The App is running on PORT ${PORT}`))



  
