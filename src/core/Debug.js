// @ifdef DEBUG
/**
 * Utility class for logging and debugging.
 *
 * @cat core
 */
export class Debug {
  constructor() {
    Debug.assert(false, 'Static class.');
  }

  static isNumber(...values) {
    values.forEach(x => {
      if (typeof x === 'number' && isNaN(parseFloat(x)) === false && isFinite(x) === true)
        return;

      let message = 'Not a number.';

      if (Debug.logOnFail)
        console.error('[ASSERT]', message);

      if (Debug.throwOnFail)
        throw new Error(message);
    });
  }

  static assert(value, message) {
    if (value === true)
      return;

    message = message == null ? 'Assertion failed.' : message;

    if (Debug.logOnFail)
      console.error('[ASSERT]', message);

    if (Debug.throwOnFail)
      throw new Error(message);
  }

  static assertWarn(value, message) {
    if (value === true)
      return;

    message = message == null ? 'Assertion warning.' : message;
    Debug.warn(message);
  }

  static assertInfo(value, message) {
    if (value === true)
      return;

    message = message == null ? 'Assertion info.' : message;
    Debug.info(message);
  }

  /**
   * Outputs a message to the console
   * 
   * @param  {...string} message
   */
  static log(...message) {
    console.info('%c%s', 'color: #000000', 'LOG:', ...message);
  }

  /**
   * Outputs a info message to the console
   * 
   * @param  {...string} message
   */
  static info(...message) {
    console.info('%c%s', 'color: #003bd2', 'INFO:', ...message);
  }

  /**
   * Outputs a warning message to the console
   * 
   * @param  {...string} message
   */
  static warn(...message) {
    console.info('%c%s', 'color: #f67400', 'WARN:', ...message);
  }

  /**
   * Outputs a error message to the console
   * 
   * @param  {...string} message
   */
  static error(...message) {
    console.info('%c%s', 'color: #d50000', 'ERROR:', ...message);
  }

  /**
   * 
   * @param {string} name 
   */
  static time(name) {
    Debug.timeProfiles[name] = performance.now();
  }

  /**
   * 
   * @param {string} name 
   */
  static timeEnd(name) {
    Debug.timeProfiles[name] = performance.now() - Debug.timeProfiles[name];
  }
}

Debug.throwOnFail = true;
Debug.logOnFail = false;
Debug.timeProfiles = {};
// @endif