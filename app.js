const express =require('express')
// console.log(e)
const app =express()
const port =4000
const web = require('./routes/web')
const connectDb =require('./db/connectDb')

const cookieParser=require('cookie-parser')

app.use(cookieParser())


//file upload
const fileUpload=require('express-fileupload')
//tempfiles uploaderz
app.use(fileUpload({useTempFiles:true}))

//connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash');
//messages
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }));
//Flash messages
app.use(flash());

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false }))
//connect database
connectDb()
//image css link
app.use(express.static('public'))


// route load
app.use('/',web)

//ejs set html
app.set('view engine','ejs')

// create server local host:4000
app.listen(port,()=>console.log("Server is Running local host:4000"))
