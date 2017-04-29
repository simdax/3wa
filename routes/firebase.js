(
	function(){

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

}()
)