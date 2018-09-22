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
    let ppVal = snapshot.val()[keys[keys.length - 1]]
    var imu = new five.IMU({
      controller: "MPU6050"
    });
    let count = 0
    //var gps = new five.GPS({});
    imu.on("change", function() {
      if (this.accelerometer.acceleration > 2) {
        db.ref('parcels/' + keys[keys.length - 1] + '/gyro/threshold')
	  .set(true);
      }else if(ppVal.gyro.threshold === true){
	db.ref('parcels/' + keys[keys.length - 1] + '/gyro/threshold')
          .set(false);
      }
      if (this.accelerometer.acceleration > 1.5) {
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
