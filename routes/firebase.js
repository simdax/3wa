(function(){

console.log();
var express = require('express');
var app = express();

//        __ ___       _ __
//      _/_//_    (_)___  (_) /_
//    _/_//_/    / / __ \/ / __/
//  _/_//_/     / / / / / / /_
// /_//_/      /_/_/ /_/_/\__/

var firebase = require('firebase');
var config = require("../.firebase");
var admin = require('firebase-admin');
var key = require("../.firebaseAdminKey");

firebase.initializeApp(config);
admin.initializeApp({
  credential: admin.credential.cert(key),
  databaseURL: "https://waparis-5a994.firebaseio.com"
});
var db = firebase.database();

var globalAuth = function (app) {
  // console.log(app);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // app.locals.logged = true;
      // app.locals.name = user.displayName;
      console.log("logged");
    } else {
      // app.locals.logged = false;
      // app.locals.name = "stranger";
      console.log("user unlogged");
    }
  })
};


//        __ __   __         __
//      _/_//_/  / /_  ___  / /___  ___  __________
//    _/_//_/   / __ \/ _ \/ / __ \/ _ \/ ___/ ___/
//  _/_//_/    / / / /  __/ / /_/ /  __/ /  (__  )
// /_//_/     /_/ /_/\___/_/ .___/\___/_/  /____/
//                        /_/

var signIn = function(mail, req, res) {      
	return firebase.auth().signInWithEmailAndPassword(mail, "pasdepass")
  .then(function(user) {
    // res.locals.logged = true; 
    // res.locals.name = user.displayName; 
    req.session.logged = true; 
    req.session.name = user.displayName; 
    console.log("signed in");
  },
  function(err) {
    console.log("erreur");
    var errorCode = err.code;
    var msg = err.message;
    res.send('bon alors ?')
  });
};

function writeUserData(userid,name,email,imageUrl) {
  console.log(userid,name,email);
  firebase.database().ref('/users/'+userid).set({
    userId: userid,
    username: name,
    email: email,
    infos: { niveau : "pourri"}
  })
};

function logOut() {
  return firebase.auth().signOut()
}
var update = function (user, nom) {
    // update profile ...
    user.updateProfile({
      displayName: nom
    }).then(function() {
      console.log("nom de l'user : "+user.displayName);
      writeUserData(user.uid,user.displayName,user.email);
    });
  }

  function sendMail(user) {
    user.sendEmailVerification().then(function() {
      console.log("email sent");
      // res.redirect('upload');
    },function(err) { 
      console.log("error : "+err);
      // res.send("problème de création de mail... "+err);
    }
    );
  }

// create user
var create = function(nom, mail, res, req){
  return firebase.auth().createUserWithEmailAndPassword(mail, "pasdepass").then(function(user) {
   // req.session.user = user;
   update(user, nom);
   sendMail(user);
 }, function(err) {
   console.log("problème de création de user... "+err);
 })
};

var getUsers = function (cb) {
  admin.database().ref('/users').once('value',function(snapshot) {
    var vals = snapshot.val();
    var array = [];
    for(k in vals){
      array.push(vals[k])
    };
    cb(array);
  })
};

module.exports={
	signIn: signIn,
	create: create,
	update: update,
  getUsers: getUsers,
  globalAuth: globalAuth,
  logOut: logOut
}

}())