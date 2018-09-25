var Raspi = require('raspi-io');
var five = require("johnny-five");
var board = new five.Board({
	io: new Raspi()
});
var db = require('./firebase.js');
var axios = require('axios');
let count = 0

board.on("ready", function() {
  var imu = new five.IMU({
    controller: "MPU6050"
  });
  var piezo = new five.Piezo("P1-13");
  board.repl.inject({
    piezo: piezo
  });
  imu.on("change", function(){
    db.ref("/parcels").once('value', (snapshot) =>{
      let keys = Object.keys(snapshot.val())
      console.log('Package id: ',keys[keys.length - 1])
      let ppVal = snapshot.val()[keys[keys.length - 1]]
      if (ppVal.gyro.threshold === false) {
        if (imu.accelerometer.acceleration > 2) {
          piezo.play({
  				  song: [
  			           ["E5", 1],
  			           ["C5", 1],
  			           ["D5", 1],
  			           ["G4", 2],
  			           [null, 1],
  			           ["G4", 1],
  			           ["D5", 1],
  			           ["E5", 1],
  			           ["C5", 2],
  			    	   [null, 1]
  				  ],
  				  tempo: 150
  				})
          db.ref('parcels/' + keys[keys.length - 1] + '/gyro/threshold')
        	  .set(true);
        }
      }else {
        db.ref('parcels/' + keys[keys.length - 1] + '/gyro/threshold')
          .set(false);
      }
      if (count < 1500) {
        count += 1
      }else {
       axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDB9cdCbWSwhyQzYsFwhAWH68OARzl1vpI')
       .then(res=>{
        db.ref('parcels/' + keys[keys.length - 1] + '/gps').set({
          lat: res.data.location.lat,
          long: res.data.location.lng
         })
       })
       .catch(err=>{
     	   console.log(err)
       })
      }
    })
  })
});
