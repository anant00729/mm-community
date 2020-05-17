const express = require('express')
const db = require('./config/database')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const xlsx = require('xlsx')
const moment = require("moment");
const User = require('./v1/auth/model/User')

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


// app.post('/insertUsers', async (req,res) => {
//     let mainResult = []
//     var workbook = xlsx.readFile('hi-story-users.xlsx');
//     var sheet_name_list = workbook.SheetNames;
//     mainResult = [...xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])]


//     let dataString = ''
//     for(stu of mainResult){
//         dataString += "("
//         for(key of Object.keys(stu)){
//             if(key == 'dob'){
//                 let temp = ''
//                 let slashDate = stu[key].split('--')
//                 temp = slashDate[1]
//                 slashDate[1] = slashDate[0]
//                 slashDate[0] = temp
//                 let date = moment(slashDate.join('/')).format("MM/DD/YYYY");
//                 stu[key] = date
//                 dataString += "'" + date + "',"+ 
//                 `'https://api.adorable.io/avatars/${stu['email']}',` +
//                 `'2019-20',` +
//                 `'12',` +
//                 `'123123123',` +
//                 `'${moment(new Date()).format("MM/DD/YYYY")}',` + 
//                 `'${moment(new Date()).format("MM/DD/YYYY")}',` +
//                 `'WEB',` +
//                 `'1',` 
//             }else {
//                 if(Object.keys(stu).length - 1 === Object.keys(stu).indexOf(key)){
//                     dataString += `'${stu[key].trim()}'`
//                 }else {
//                     dataString += `'${stu[key].trim()}'` + ","
//                 }
//             }
//         }
//         dataString += "),"
//     }

//     dataString = dataString.slice(0, -1); 
//     let user = new User()
//     let userRes = await user.addMutipleUserDetails(dataString)
//     res.json(userRes)
// })


app.get('*', (req,res)=> {
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'))
})
const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>console.log(`The App is running on PORT ${PORT}`))



  
