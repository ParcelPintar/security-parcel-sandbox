var five = require("johnny-five");
const axios = require('axios')
var board = new five.Board();
var db = require('./firebase.js')
let key


board.on("ready", function() {
  db.ref('/parcels').on('value', (snapshot) => {
    let keys = Object.keys(snapshot.val())
    // key = Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1]
    console.log(keys[keys.length - 1]);
    var imu = new five.IMU({
      controller: "MPU6050"
    });
    var gps = new five.GPS({
      pins: {
        rx: 0,
        tx: 1,
      }
    });
    let maxA = 0

    imu.on("change", function() {
      if (this.accelerometer.acceleration > 2) {
        db.ref('parcels/' + keys[keys.length - 1] + '/gyro/threshold')
	  .set(true);
      }else{
	      db.ref('parcels/' + keys[keys.length - 1] + '/gyro/threshold')
          .set(false);
      }
      // console.log("  latitude   : ", gps.latitude);
      // console.log("  longitude  : ", gps.longitude);
      if (gps.latitude !== 0 || gps.longitude !== 0) {
        db.ref('parcels/' + keys[keys.length - 1] + '/gps').set({
           lat: gps.latitude,
           long: gps.longitude
        });
      }
      if (this.accelerometer.acceleration > 1.5) {
        console.log(this.accelerometer.acceleration);
      }
      console.log(gps.longitude);
    });
  })
});
