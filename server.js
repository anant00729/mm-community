const express = require('express')
const db = require('./config/database')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const app = express() 

// Authenticate DB 
db.authenticate()
.then(() => console.log('^^%&%^&^%^$%^&$%%^$%^$^ Wolla Connected to DB ^^%&%^&^%^$%^&$%%^$%^$^'))
.catch(err=> console.log(`DB Connection failed ${err.message}`))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/v1/auth', require('./v1/auth/routes/authRoute'))
app.use('/v1/story', require('./v1/auth/routes/storyRoute'))
app.use('/v1/image', require('./v1/imageAndMail/routes/imageRoute'))
app.use('/v1/mail', require('./v1/imageAndMail/routes/mailRoute'))

app.use(express.static('public/build'));
app.use(express.static('public'));

app.get('*', (req,res)=> {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'))
})
const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>console.log(`The App is running on PORT ${PORT}`))



  
