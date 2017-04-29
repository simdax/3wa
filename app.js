var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fileupload = require('express-fileupload');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

// file uploading

app.use(fileupload());
app.post("/newFile", function(req, res){

  console.log(req.files);

  if(req.files.html){  
    console.log("processing html");
    fs.writeFile("uploads/index.html", req.files.html.data, function (err) {
      console.log(err);
    });
  }
  if(req.files.css){  
        console.log("processing css");
    fs.writeFile("uploads/style.css", req.files.css.data, function (err) {
      console.log(err);
    });
  }
  if(req.files.js){  
        console.log("processing js");
    fs.writeFile("uploads/main.js", req.files.js.data, function (err) {
      console.log(err);
    });
  }
  res.redirect("/users");
})

app.use(express.static(path.join(__dirname, 'public')));
app.use("/users", express.static(path.join(__dirname, 'uploads')));
app.use('/', index);
// app.use('/users', users);

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
