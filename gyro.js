var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var imu = new five.IMU({
    controller: "MPU6050"
  });
  let minA = 5
  let maxA = 0
  let minI = 5
  let maxI = 0
  imu.on("change", function() {
    // console.log("Thermometer");
    // console.log("  celsius      : ", this.thermometer.celsius);
    // console.log("  fahrenheit   : ", this.thermometer.fahrenheit);
    // console.log("  kelvin       : ", this.thermometer.kelvin);
    // console.log("--------------------------------------");

    console.log("Accelerometer");
    console.log("  x            : ", this.accelerometer.x);
    console.log("  y            : ", this.accelerometer.y);
    console.log("  z            : ", this.accelerometer.z);
    console.log("  acceleration : ", this.accelerometer.acceleration);
    if (this.accelerometer.acceleration > maxA) {
      maxA = this.accelerometer.acceleration
    }
    if (this.accelerometer.acceleration < minA) {
      minA = this.accelerometer.acceleration
    }
    console.log("  inclination  : ", this.accelerometer.inclination);
    if (this.accelerometer.inclination > maxI) {
      maxI = this.accelerometer.inclination
    }
    if (this.accelerometer.inclination < minI) {
      minI = this.accelerometer.inclination
    }
    console.log('minAAA----',minA);
    console.log('maxAAA----', maxA);
    console.log('minIII----',minI);
    console.log('maxIII----', maxI);
    //
    // console.log("Gyroscope");
    // console.log("  x            : ", this.gyro.x);
    // console.log("  y            : ", this.gyro.y);
    // console.log("  z            : ", this.gyro.z);
    // console.log("  pitch        : ", this.gyro.pitch);
    // console.log("  roll         : ", this.gyro.roll);
    // console.log("  yaw          : ", this.gyro.yaw);
    // console.log("  rate         : ", this.gyro.rate);
    // console.log("  isCalibrated : ", this.gyro.isCalibrated);
    // console.log("--------------------------------------");
  });

});
