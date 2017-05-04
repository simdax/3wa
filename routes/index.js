var express = require('express');
var router = express.Router();

var firebase = require('./firebase.js');

router.get('/', function(req, res) {
  res.render('index', { title: '3wa Coding Challenges' });
});

// we need res to redirect
var create = function(req, res) {
  var nom  =  req.body.nom;
  var mail =  req.body.mail;
  firebase.create(nom,mail,res,req);
};
// we use req to store cookies
var signIn =  function (req,res) {
  var mail = req.body.mail;
  firebase.signIn(mail, req, res);
}
var home = function (req,res) {
	var name = "stranger";
  var namePopUp = false;
	if (req.session.user) {
		var name =  req.session.user.displayName;
    if (!name) {
      console.log("la");
      namePopUp = true;
    }
	}
  res.render("upload", { popup: namePopUp, name: name})
};

var justName = function (req, res) {
  firebase.update(req.body.name, user);
  res.redirect('/upload');
}

router.get('/upload', home);
router.post('/signUp', create);
router.post("/signIn", signIn);
router.post("/justName", justName)

module.exports = router;
