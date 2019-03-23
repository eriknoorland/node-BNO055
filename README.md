# node-pixy2-serial-json
A Node module to communicate withe the Adafruit BNO055 IMU through an Arduino (see https://github.com/eriknoorland/imu-serial-json).

## installation
```
npm install git+https://git@github.com/eriknoorland/node-imu.git
```

## usage
```javascript
const IMU = require('node-imu');
const imu = IMU('<usb-port-name>');

imu.on('data', (data) => {
  console.log(data);
});

imu.init();
```
