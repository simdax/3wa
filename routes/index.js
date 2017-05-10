var express = require('express');
var router = express.Router();
var firebase = require('./firebase.js');
var fs =require('fs');
var takePicture = require('./webshot.js');


router.get('/', function(req, res) {
  res.render('index', { title: '3wa Coding Challenges' });
});

var template = "<p>Il n'y a rien dedans ! Va uploader <a href='troiswa.herokuapp.com/upload'>ici</a></p>";

// we need res to redirect
var create = function(req, res) {
  var nom  =  req.body.nom;
  var mail =  req.body.mail;
  var promise = firebase.create(nom,mail,res,req);
  dir = "uploads/"+nom;
  fs.existsSync("uploads") || fs.mkdirSync("uploads");
  fs.existsSync(dir) || fs.mkdirSync(dir);
  fs.writeFileSync(dir+"/index.html",template);
  takePicture(dir+"prev.png",template,"");
  var back= function(){res.redirect('back')};
  promise.then(back);
};
// we use req to store cookies
var signIn =  function (req,res) {
  var back= function(user){
    res.redirect('back')
  };  
  var mail = req.body.mail;
  var promise =  firebase.signIn(mail, req, res);
  promise.then(back);
}
var logOut = function (req, res) {
  firebase.logOut().then(function () {
    req.session.logged = false;
    req.session.name = null;
    req.session.mail = null;
    res.redirect('back');
  });
}

var updateDB = function (req,res) {
  console.log(req.body);
  console.log(req.session.name);
  console.log(req.session.mail);
  var name = req.session.name;
  var data = {stars : req.body.stars, time: new Date()};
  console.log(data);
  firebase.updateDb(req.session.mail, "works/"+req.body.work+"/by-"+name, data);
}


router.get("/logOut", logOut);
router.post('/signUp', create);
router.post("/signIn", signIn);
router.post("/rateWork", updateDB);


// deprecated
// var justName = function (req, res) {
//   firebase.update(req.body.name, user);
//   res.redirect('/upload');
// }
// router.post("/justName", justName)

module.exports = router;