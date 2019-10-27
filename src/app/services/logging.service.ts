
export class Logger {

  constructor() { }

  static debugStyle = 'background: purple;' +
    'color: white;' +
    'font-weight: bold;' +
    'line-height: 20px;';

  static infoStyle = 'background: blue;' +
    'color: white;' +
    'font-weight: bold;' +
    'line-height: 20px;';

  static warnStyle = 'color: orange;' +
    'font-weight: bold;';

  static errorStyle = 'color: red;' +
    'font-weight: bold;';

  static localHost = (window.location.href.indexOf('localhost') >= 0);
  static devHost = (window.location.href.indexOf('localhost') >= 0 || window.location.href.indexOf('xm-cloud') >= 0);

  // only print debug messages when running on localhost
  static debug(...args): void {
    if (this.localHost) {
      console.log('%c %s ', this.debugStyle, ...this.addTimestamp(...args));
    }
  }

  // only print info messages when running on localhost or xm-cloud (dev)
  static info(...args): void {
    if (this.devHost) {
      console.log('%c %s ', this.infoStyle, ...this.addTimestamp(...args));
    }
  }

  // only print info messages when running on localhost or xm-cloud (dev)
  static log(...args): void {
    if (this.devHost) {
      console.log('%c %s ', this.debugStyle, ...this.addTimestamp(...args));
    }
  }

  // print warnings in all environments
  static warn(...args): void {
    console.warn('%c %s ', this.warnStyle, ...this.addTimestamp(...args));
  }

  // print errors in all environments
  static error(...args): void {
    console.error('%c %s ', this.errorStyle, ...this.addTimestamp(...args));
  }

  static addTimestamp(...args) {
    if (typeof args[0] === 'string') {
      return ['[' + new Date().toISOString().slice(11, -5) + '] ' + args[0], ...args.slice(1)];
    }
    return ['[' + new Date().toISOString().slice(11, -5) + '] ', ...args];
  }
}
