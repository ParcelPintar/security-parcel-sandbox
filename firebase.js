const firebase = require('firebase')

var config = {
    apiKey: "AIzaSyBusm9JM3_r6_fsly7nFejjNmSy7SKCHOg",
    authDomain: "parcel-pintar.firebaseapp.com",
    databaseURL: "https://parcel-pintar.firebaseio.com",
    projectId: "parcel-pintar",
    storageBucket: "parcel-pintar.appspot.com",
    messagingSenderId: "837499236430"
  };
const firebaseApp = firebase.initializeApp(config);

var db = firebaseApp.database()
module.exports = db
