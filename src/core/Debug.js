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
    console.info('%c%s', 'color: black;', 'LOG:', ...message);
  }

  static info(...message) {
    console.info('%c%s', 'color: #003bd2;', 'INFO:', ...message);
  }

  static warn(...message) {
    console.info('%c%s', 'color: #f67400;', 'WARN:', ...message);
  }

  static error(...message) {
    console.info('%c%s', 'color: #d50000;', 'ERROR:', ...message);
  }

  static drawText(text) {
    let renderer = Black.instance.video.getRenderer('Text');
    renderer.blendMode = BlendMode.DIFFERENCE;
    renderer.lineHeight = 1;
    renderer.layer = 'debug';
    renderer.text = text;
    renderer.style = new TextInfo();
    renderer.style.color = 0xffffff;
    renderer.transform = new Matrix();
    renderer.lineBounds = TextMetricsEx.measure(text, renderer.style, 100);
    Black.instance.video.registerDebugRenderer(renderer);
  }
}

Debug.throwOnFail = false;
Debug.logOnFail = true;
