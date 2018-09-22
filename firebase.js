const firebase = require('firebase')

var config = {
    apiKey: "AIzaSyDhMA3c9E3G_NMToOQaTPdj1sfiPRlkHZA",
    authDomain: "parcelpintar.firebaseapp.com",
    databaseURL: "https://parcelpintar.firebaseio.com",
    projectId: "parcelpintar",
    storageBucket: "parcelpintar.appspot.com",
    messagingSenderId: "99027163766" 
  };
const firebaseApp = firebase.initializeApp(config);

var db = firebaseApp.database()
module.exports = db
