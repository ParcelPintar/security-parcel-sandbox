var Raspi = require('raspi-io');
var five = require("johnny-five");
var board = new five.Board({
	io: new Raspi()
});
var db = require('./firebase.js');
var axios = require('axios');

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
      console.log('Package id: ',keys[keys.length - 1]);
      let ppVal = snapshot.val()[keys[keys.length - 1]]
      if (ppVal.gyro.threshold === false) {
        if (imu.accelerometer.acceleration > 2) {
          db.ref('parcels/' + keys[keys.length - 1] + '/gyro/threshold')
        	  .set(true);
        }
      }else {
        db.ref('parcels/' + keys[keys.length - 1] + '/gyro/threshold')
          .set(false);
      }
    })
  })
});
