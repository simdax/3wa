var express = require('express');
var router = express.Router();
var firebase = require('./firebase.js');
var fs =require('fs');
var takePicture = require('./webshot.js');


router.get('/', function(req, res) {
  res.render('index', { title: '3wa Coding Challenges' });
});

var template = "Il n'y a rien dedans !";

// we need res to redirect
var create = function(req, res) {
  var back= function(){res.redirect('back')};
  var nom  =  req.body.nom;
  var mail =  req.body.mail;
  var promise = firebase.create(nom,mail,res,req);
  dir = "uploads/"+nom;
  fs.existsSync(dir) || fs.mkdirSync(dir);
  fs.writeFile(dir+"/index.html",template,function(err) {
    console.log(err);
  });
  takePicture(dir+"prev.png",template,"");
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
var upload = function (req,res) {
  res.render("upload")
};
var logOut = function (req, res) {
  firebase.logOut().then(function () {
    req.session.logged = false;
    req.session.name = "stranger";
    res.redirect('back');
  });
}


router.get('/upload', upload);
router.get("/logOut", logOut);
router.post('/signUp', create);
router.post("/signIn", signIn);


// deprecated
// var justName = function (req, res) {
//   firebase.update(req.body.name, user);
//   res.redirect('/upload');
// }
// router.post("/justName", justName)

module.exports = router;