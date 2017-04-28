firebase = require('firebase');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   	console.log("logged");
	 	var name = user.displayName;
	  var email = user.email;
	  var photoUrl = user.photoURL;
	  var emailVerified = user.emailVerified;
	  console.log(name,email,photoUrl,emailVerified);
  } else {
  	console.log("user unlogged");
  }
});