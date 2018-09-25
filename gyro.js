var Raspi = require('raspi-io');
var five = require("johnny-five");
var board = new five.Board({
	io: new Raspi()
});

board.on("ready", function() {
  var imu = new five.IMU({
    controller: "MPU6050"
  });
  let count = 0
  imu.on("change", function() {
    if(count < 1000){
      count += 1
    }else{
     count = 0
     console.log("Gyroscope");
     console.log("  x            : ", this.gyro.x);
     console.log("  y            : ", this.gyro.y);
     console.log("  z            : ", this.gyro.z);
     console.log("  pitch        : ", this.gyro.pitch);
     console.log("  roll         : ", this.gyro.roll);
     console.log("  yaw          : ", this.gyro.yaw);
     console.log("  rate         : ", this.gyro.rate);
     console.log("  isCalibrated : ", this.gyro.isCalibrated);
     console.log("--------------------------------------");
    }
  });

});
