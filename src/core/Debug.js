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

  static log(...message) {
    console.info('  %c%s', 'color: black;', 'LOG:', ...message);
  }

  static info(...message) {
    console.info(' %c%s', 'color: #003bd2;', 'INFO:', ...message);
  }

  static warn(...message) {
    console.info(' %c%s', 'color: #f67400;', 'WARN:', ...message);
  }

  static error(...message) {
    console.info('%c%s', 'color: #d50000;', 'ERROR:', ...message);
  }
}

Debug.throwOnFail = false;
Debug.logOnFail = true;
