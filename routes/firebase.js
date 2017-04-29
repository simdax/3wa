(function(){

//        __ ___       _ __
//      _/_//_(_)___  (_) /_
//    _/_//_// / __ \/ / __/
//  _/_//_/ / / / / / / /_
// /_//_/  /_/_/ /_/_/\__/

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

	// global hook ===> purpose ??
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("logged");
		} else {
			console.log("user unlogged");
		}
	});

	//        __ __   __         __
	//      _/_//_/  / /_  ___  / /___  ___  __________
	//    _/_//_/   / __ \/ _ \/ / __ \/ _ \/ ___/ ___/
	//  _/_//_/    / / / /  __/ / /_/ /  __/ /  (__  )
	// /_//_/     /_/ /_/\___/_/ .___/\___/_/  /____/
	//                        /_/

	var signIn = function(mail, req, res) {      
		firebase.auth().signInWithEmailAndPassword(mail, "pasdepass").then(function(user) {
			req.session.user = user;
			res.redirect('upload');
		},
		function(err) {
			console.log("erreur");
			var errorCode = err.code;
			var msg = err.message;
			res.send('bon alors ?')
		});
	};

	var updateName =function (user, nom) {
      // update profile ...
      user.updateProfile({
      	displayName: nom
      }).then(function() {
      	console.log("nom de l'user : "+user.displayName);
      });
	}

  // create user
  var create = function(nom, mail, res, req){
  	firebase.auth().createUserWithEmailAndPassword(mail, "pasdepass").then(function(user) {
  		updateName(user, nom);
      // ... and send email verification
      user.sendEmailVerification().then(function() {
      	console.log("email sent");
      	req.session.user = user;
      	res.redirect('upload');
      },function(err) { 
      	console.log("error : "+err);
      	res.send("problème de création de mail...");
      }
      );
    }, function() {
    	res.send("problème de création de user...");
    })
  };


  module.exports={
  	signIn: signIn,
  	create: create,
  	updateName: updateName
  }

}())