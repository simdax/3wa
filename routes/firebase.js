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
            // console.log(user);
      // console.log(firebase.database().ref());

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
      // DATABASE
      req.session.user = user;
      // console.log('logged with '+user.displayName);
      res.redirect('upload');
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
      email: email 
    })
  };
    
  var update =function (user, nom) {
      // update profile ...
      user.updateProfile({
        displayName: nom
      }).then(function() {
        console.log("nom de l'user : "+user.displayName);
        writeUserData(user.uid,user.displayName,user.email);
      });
  }

  // create user
  var create = function(nom, mail, res, req){
    firebase.auth().createUserWithEmailAndPassword(mail, "pasdepass").then(function(user) {
      console.log(user);
      update(user, nom);
      // ... and send email verification
      user.sendEmailVerification().then(function() {
        console.log("email sent");
        req.session.user = user;
        res.redirect('upload');
      },function(err) { 
        console.log("error : "+err);
        res.send("problème de création de mail... "+err);
      }
      );
    }, function(err) {
    	res.send("problème de création de user... "+err);
    })
  };


  module.exports={
  	signIn: signIn,
  	create: create,
  	update: update
  }

}())