var express = require('express');
var router = express.Router();

var fs = require('fs');
var firebase = require('./firebase');
var fb = require('firebase');

var pres =  function(req, res, next) {
  fs.readdir('uploads', function (err,files) {
    var f = [];
    files.forEach((v,i)=>{
      if(fs.lstatSync('uploads/'+v).isDirectory()){
        f.push(v);
      } 
    });
    var callback =function(users) { 
        res.render('users', {users:users}) 
    };
    firebase.getUsers(callback);
  })
};

function getStars(req,res) {
  var stars={};
  if(req.session.logged){
    fb.auth().signInWithEmailAndPassword(req.session.mail,'pasdepass').then(function (user) {
      var query = fb.database().ref('works/')
      .once('value',function(sn) {
        var query = sn.val();
        for(k in query){
          var el = query[k];
          var vote = el["by-"+req.session.name];
          if(vote){
            stars[k] = vote.stars;
           }
        };
        res.send(stars)
      })
    },function (er) {
        console.log(er);
    })
  }
};

router.get('/stars', getStars);
router.get('/', pres);
module.exports = router;
