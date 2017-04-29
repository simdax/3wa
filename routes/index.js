var express = require('express');
var router = express.Router();

var firebase = require('./firebase.js');

router.get('/', function(req, res) {
  res.render('index', { title: '3wa Coding Challenges' });
});

var create = function(req, res) {
  var nom  =  req.body.nom;
  var mail =  req.body.mail;
  firebase.create(nom,mail);
};
var signIn =  function (req,res) {
  var mail = req.body.mail;
  firebase.signIn(mail);
}
var home = function (req,res) {
  res.render("upload", { success:null, name: req.session.user.displayName || "stranger" });
};

router.get('/upload', home);
router.post('/signUp', create);
router.post("/signIn", signIn);

module.exports = router;
