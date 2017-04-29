var express = require('express');
var router = express.Router();

var firebase = require('firebase');
require('./firebase.js');


router.get('/', function(req, res, next) {
  res.render('index', { title: '3wa Coding Challenges' });
});

var home = function (req,res) {
  var nom = console.log(req.query.nom) || "stranger" ;
  res.render("upload", { success:null, name: nom });
};
router.get('/upload', home);


router.post('/signUp', function(req, res) {

  var nom  =  req.body.nom;
  var mail =  req.body.mail;

  // create user
  firebase.auth().createUserWithEmailAndPassword(mail, "pasdepass").then(function() {
      var user = firebase.auth().currentUser;
      // update profile ...
      user.updateProfile({
        displayName: nom
      }).then(function() {
        console.log("nom de l'user : "+user.displayName);
      });
      // ... and send email verification
      user.sendEmailVerification().then(function() {
        console.log("email sent");
      },function(err) { console.log("error : "+err);});
  });


})

router.post("/signIn", function(req, res) {      
  var mail = req.body.mail;
  firebase.auth().signInWithEmailAndPassword(mail, "pasdepass").then(function() {
    var user = firebase.auth().currentUser;
    res.redirect("/upload?name="+user.displayName);
  },
    function(err) {
      console.log("erreur");
     var errorCode = err.code;
     var msg = err.message;
     res.send('bon alors ?')
  });
 })

module.exports = router;
