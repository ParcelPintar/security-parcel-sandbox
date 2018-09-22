var Raspi = require('raspi-io');
var five = require("johnny-five");
var board = new five.Board({
	io: new Raspi()
});
var db = require('./firebase.js');
var axios = require('axios');

board.on("ready", function() {
  db.ref('/parcels').on('value', (snapshot) => {
    let keys = Object.keys(snapshot.val())
    console.log('Package id: ',keys[keys.length - 1]);
    var imu = new five.IMU({
      controller: "MPU6050"
    });
    
    //var gps = new five.GPS({});
    imu.on("change", function() {
      if (this.accelerometer.acceleration > 2) {
        db.ref('parcels/' + keys[keys.length - 1] + '/gyro/threshold')
	  .set(true);
      }else{
	db.ref('parcels/' + keys[keys.length - 1] + '/gyro/threshold')
          .set(false);
      }
      if (this.accelerometer.acceleration > 1.5) {
        console.log(this.accelerometer.acceleration);
      }
    });
  })
});
