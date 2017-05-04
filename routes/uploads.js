var express = require('express');
var router = express.Router();

var fs = require('fs');
var firebase = require('./firebase');

var pres =  function(req, res, next) {
  fs.readdir('uploads', function (err,files) {
    var f = [];
    files.forEach((v,i)=>{
      if(fs.lstatSync('uploads/'+v).isDirectory()){
        f.push(v);
      } 
    });
    var callback =function(users) { 
      console.log("coucou");
      console.log(res);
      res.render('users', {users:users}) 
    };
    firebase.getUsers(callback);
	})
};

router.get('/', pres);
module.exports = router;
