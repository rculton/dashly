const
  app = require('express')(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  mongoose = require('mongoose'),
  ejsLayout = require('express-ejs-layouts'),
  flash = require('connect-flash'),
  session = require('express-session'),
  mongoDbStore = require('connect-mongodb-session')(session),
  passport = require('passport'),
//

// enviroment port
const
  PORT = process.env.PORT || 3000,
  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/my-dashboard'
  
// mongoose database
mongoose.connect(mongoConnectionString, (err) => {
    if(err) return console.log(err)
    console.log('Connected to MongoDB ✔️')
})

//
const store  = new mongoDbStore({
    uri: mongoConnectionString,
    collection: 'sessions'
})

app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(flash())

// config cookies 
app.use({
    secret: 'generalAssembly',
    cookie: {maxAge: 60000},
    resave: true,
    saveUninitialize: false,
    store: store
})

app.use(passport.initialize())
app.use(ejsLayout)

app.use((req, res, next) => {
    app.locals.currentUser = req.user
    app.locals.loggedIn = !!req.user
    next()
})

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(PORT, (err) => {
    console.log(err || `Listening to port 🤖  ${PORT} 🤖`)
})
