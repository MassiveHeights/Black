// @ifdef DEBUG
/**
 * Utility class for logging and debugging.
 *
 * @cat core
 */
/* @echo EXPORT */
class Debug {
  constructor() {
    Debug.assert(false, 'Static class.');
  }

  static assert(value, message) {
    if (value === true)
      return;

    message = message == null ? 'Assertation failed.' : message;

    if (Debug.logOnFail)
      console.error('[ASSERT]', message);

    if (Debug.throwOnFail)
      throw new Error(message);
  }

  /**
   * Outputs a message to the console
   * 
   * @param  {...string} ...message
   */
  static log(...message) {
    console.info('%c%s', 'color: #000000', 'LOG:', ...message);
  }

  /**
   * Outputs a info message to the console
   * 
   * @param  {...string} ...message
   */
  static info(...message) {
    console.info('%c%s', 'color: #003bd2', 'INFO:', ...message);
  }

  /**
   * Outputs a warning message to the console
   * 
   * @param  {...string} ...message
   */
  static warn(...message) {
    console.info('%c%s', 'color: #f67400', ...message);
  }

  /**
   * Outputs a error message to the console
   * 
   * @param  {...string} ...message
   */
  static error(...message) {
    console.info('%c%s', 'color: #d50000', 'ERROR:', ...message);
  }
}

Debug.throwOnFail = true;
Debug.logOnFail = false;
// @endif