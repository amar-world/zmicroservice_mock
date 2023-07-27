class Logger {
  constructor() {}
  log(logText,object) {
    console.log( `log::::: ${logText}`,  object);
  }
  info(logText) {
    console.log(new Date() + "info:::::" + logText);
  }
  debug(logText) {
    console.log(new Date() + "debug:::::" + logText);
  }
  error(logText) {
    console.log(new Date() + "error:::::" + logText);
  }
}

module.exports = new Logger();
