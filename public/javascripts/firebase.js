
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCu_RFj_8lFrTe3-H1PYH0kZiSm-D17u-s",
    authDomain: "mon-super-projet-f2f0e.firebaseapp.com",
    databaseURL: "https://mon-super-projet-f2f0e.firebaseio.com",
    projectId: "mon-super-projet-f2f0e",
    storageBucket: "mon-super-projet-f2f0e.appspot.com",
    messagingSenderId: "123970335295"
  };
  firebase.initializeApp(config);

function submitForm(e) {
  e.preventDefault();
  var name = $('input[type="text"]').val();
  var mail = $('input[type="mail"]').val();
  console.log(name);
//  firebase. fait des trucs
}

