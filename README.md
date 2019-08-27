# node-BNO055
A Node module to communicate with the Adafruit BNO055 IMU through an Arduino (see https://github.com/eriknoorland/arduino-BNO055).

## installation
```
npm install git+https://git@github.com/eriknoorland/node-BNO055.git
```

## usage
```javascript
const BNO055 = require('node-BNO055');
const imu = BNO055('<usb-port-name>');

imu.on('data', (data) => {
  console.log(data);
});

imu.init();
```
