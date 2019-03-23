const IMU = require('../src/IMU');
const imu = IMU('<usb-port-name>');

imu.on('data', (data) => {
  console.log(data);
});

imu.init();
