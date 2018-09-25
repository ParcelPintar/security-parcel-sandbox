require('events').EventEmitter.prototype._maxListeners = 5
var Raspi = require('raspi-io');
var five = require("johnny-five");
var board = new five.Board({
	io: new Raspi()
});
var db = require('./firebase.js');
var axios = require('axios');
let acc

board.on("ready", function() {
   db.ref('/parcels').on('value', (snapshot) => {
    let keys = Object.keys(snapshot.val())
    console.log('Package id: ',keys[keys.length - 1]);
    let ppVal = snapshot.val()[keys[keys.length - 1]]
    var imu = new five.IMU({
      controller: "MPU6050"
    });
    let count = 0
    var piezo = new five.Piezo("P1-13");
    board.repl.inject({
      piezo: piezo
    });
    //var gps = new five.GPS({});
    imu.on("change", function() {
      let diff = Math.abs(acc - this.accelerometer.acceleration)
      if (this.accelerometer.acceleration > 2.3 && diff > 0.2555) {
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
	  .set(true)
	  .then(done=>{
	    db.ref('parcels/' + keys[keys.length - 1] + '/gyro/threshold')
          .set(false);
          })
	  .catch(err=>{
	  	console.log(err)
          })
      }
      acc = this.accelerometer.acceleration
      if (this.accelerometer.acceleration > 2) {
        console.log(this.accelerometer.acceleration);
      }
      if(count < 1000){
	count += 1
      }else{
	count = 0
	axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDB9cdCbWSwhyQzYsFwhAWH68OARzl1vpI')
         .then(res=>{
          db.ref('parcels/' + keys[keys.length - 1] + '/gps').set({
            lat: res.data.location.lat,
            long: res.data.location.lng
         })
         .catch(err=>{
 	   console.log(err)
         })
       })
      }
    });
  })
});
