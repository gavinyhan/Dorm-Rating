var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dormlistRouter = require('./routes/index');
var dormRouter = require('./routes/dorm');
var submitRouter = require('./routes/submit');
var universityController = require('./controllers/universityController')
const flash = require('connect-flash')
const bodyParser = require("body-parser")



//authentication with passport
const session = require("express-session")
const passport = require('passport')
const configPassport = require('./config/passport')
configPassport(passport)

const mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/dormrating' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'zzbbyanana'}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  res.locals.loggedIn=false
  if (req.isAuthenticated()) {
    console.log("user has been authenticated")
    res.locals.user=req.user
    res.locals.loggedIn=true
    if (req.user) {
      if (req.user.googleemail=='gavinyhan@gmail.com') {
        console.log("owner has logged in")
        res.locals.status='owner'
      } else {
        console.log('student has logged in')
        res.locals.status = 'user'
      }
    }
  }
  next()
})

//authentification routes
app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})

app.get('/login', function(req,res){
  res.render('login',{})
})

//logging out
app.get('/logout',function(req,res){
  req.logout()
  res.redirect('/')
})



app.get('/auth/google',
  passport.authenticate('google',{scope:['profile','email']}));

app.get('/login/authorized',
  passport.authenticate('google', {
    successRedirect:'/',
    failureRedirect:'/loginerror'
  }))

//route middleware to make sure a user is logged inspect
function isLoggedIn(req,res,next){
  console.log("checking to see if they are authenticated")
    //if user is authenticated in the session, carry on
    res.locals.loggedIn = false
    if (req.isAuthenticated()) {
      console.log("user has been authenticated")
      req.locals.loggedIn = true
      return next();
    } else {
      console.log("user has not been authenticated")
      res.redirect('/login')
    }
}


//we require them to be logged in to see their profile
app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile',{
    user:req.user
  })
})


app.use((req,res,next)=>{
  console.log("res.locals=")
  console.dir(res.locals)
  next()
})

app.use('/', dormlistRouter);
const University = require( './models/university' );
const dormController = require('./controllers/dormController')
//const infoController = require('./controllers/infoController')
app.use('/dorm', dormController.getAllDorm)
app.use('/dorm/:id',
  dormController.attachDorm,
  universityController.attachUniversity//,
  //infoController.attachInfo,
)







//
//app.use('/submit', submitRouter);
app.get('/submit', universityController.getAllUniversity );
app.post('/saveUniversity', universityController.saveUniversity );




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
