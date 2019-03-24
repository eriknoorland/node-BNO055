const EventEmitter = require('events');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const IMU = (path) => {
  const eventEmitter = new EventEmitter();

  let doReset = false;
  let parser;
  let port;

  /**
   * Constructor
   */
  function constructor() {}

  /**
   * Init
   * @return {Promise}
   */
  function init() {
    return new Promise((resolve, reject) => {
      if (port) {
        setTimeout(reject, 0);
      }

      port = new SerialPort(path, { baudRate: 115200 });
      parser = new Readline({ delimiter: '\r\n' });

      port.pipe(parser);

      port.on('error', error => eventEmitter.emit('error', error));
      port.on('disconnect', () => eventEmitter.emit('disconnect'));
      port.on('close', () => eventEmitter.emit('close'));
      port.on('open', onPortOpen.bind(null, resolve));

      parser.on('data', (data) => {
        try {
          if (!doReset) {
            eventEmitter.emit('data', JSON.parse(data));
          }
        } catch(error) {}
      });
    });
  }

  /**
   * Reset
   * @return {Promise}
   */
  function reset() {
    doReset = true;

    return new Promise((resolve) => {
      port.write('s0');
      setTimeout(() => {
        doReset = false;
        resolve();
      }, 500);
    });
  }

  /**
   * Port open event handler
   * @param {Function} resolve
   */
  function onPortOpen(resolve) {
    port.flush(error => {
      if (error) {
        eventEmitter.emit('error', error);
      }

      resolve();
    });
  }

  constructor();

  return {
    init,
    reset,
    on: eventEmitter.on.bind(eventEmitter),
  };
};

module.exports = IMU;
