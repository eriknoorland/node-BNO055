const IMU = require('../src/IMU');
const imu = IMU('/dev/tty.usbserial-1420');

imu.on('data', (data) => {
  console.log(data);
});

imu
  .init()
  .then(() => {
    imu.setState('heading');
  });
