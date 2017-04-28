var express = require('express');
var router = express.Router();

var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyCu_RFj_8lFrTe3-H1PYH0kZiSm-D17u-s",
    authDomain: "mon-super-projet-f2f0e.firebaseapp.com",
    databaseURL: "https://mon-super-projet-f2f0e.firebaseio.com",
    projectId: "mon-super-projet-f2f0e",
    storageBucket: "mon-super-projet-f2f0e.appspot.com",
    messagingSenderId: "123970335295"
  };
firebase.initializeApp(config);


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload', function (req,res) {
  res.render("upload", { success:null, name: "stranger" });
})

router.post('/signUp', function(req, res) {

  var nom =  req.body.nom;
  var mail =  req.body.mail;

  // create user
  firebase.auth().createUserWithEmailAndPassword(mail, "pasdepass").then(function() {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: nom
      }).then(function() {
        console.log(user.displayName);
      });
      user.sendEmailVerification().then(function() {
        console.log("email sent");
      },function(err) { console.log("error : "+err);});
  });


})

router.post("/signIn", function(req, res) {      
  var mail = req.body.mail;

  firebase.auth().signInWithEmailAndPassword(mail, "pasdepass").then(function() {
    var user = firebase.auth().currentUser;
    res.render('upload', {name:user.displayName})
  },
    function(err) {
     var errorCode = err.code;
     var msg = err.message;
     res.send('bon alors ?')
  });
 })

module.exports = router;
