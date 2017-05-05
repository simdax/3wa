var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fileupload = require('express-fileupload');
var fs = require('fs');

var app = express();

//               _     __    ____
//    ____ ___  (_)___/ /___/ / /__ _      ______ _________  _____
//   / __ `__ \/ / __  / __  / / _ \ | /| / / __ `/ ___/ _ \/ ___/
//  / / / / / / / /_/ / /_/ / /  __/ |/ |/ / /_/ / /  /  __(__  )
// /_/ /_/ /_/_/\__,_/\__,_/_/\___/|__/|__/\__,_/_/   \___/____/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  secret:'s3cur3',
  resave: false,
  saveUninitialized: true,
  logged: false,
  name: "stranger"
}));
app.use(fileupload());

var firebase = require('./routes/firebase')
firebase.globalAuth(app);

app.use(function (req,res,next) {
  // if debug
  // console.log("session =  ",req.session);  
  res.locals = req.session;
  next();
})

//        __ __                    __
//      _/_//_/  _________  __  __/ /____  _____
//    _/_//_/   / ___/ __ \/ / / / __/ _ \/ ___/
//  _/_//_/    / /  / /_/ / /_/ / /_/  __(__  )
// /_//_/     /_/   \____/\__,_/\__/\___/____/


app.use(express.static(path.join(__dirname, 'public')));
app.use("/users",express.static(path.join(__dirname, 'uploads')));

require("./routes/newFile.js")(app);
var index = require('./routes/index');
var uploads = require('./routes/uploads');
var defis = require("./routes/defi")
app.use('/', index);
app.use("/users", uploads);
app.use("/defis", defis);



//   ___  ______________  __________
//  / _ \/ ___/ ___/ __ \/ ___/ ___/
// /  __/ /  / /  / /_/ / /  (__  )
// \___/_/  /_/   \____/_/  /____/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
