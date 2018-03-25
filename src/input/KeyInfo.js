/**
 * Holds information about keyboard event.
 *
 * @cat input
 */
/* @echo EXPORT */
class KeyInfo {

  /**
   * Create new instance of KeyInfo
   *
   * @param {KeyboardEvent} nativeEvent Native touch event.
   * @return {void}
   */
  constructor(nativeEvent) {
    this.keyCode = nativeEvent.keyCode;
    this.code = nativeEvent.code;
    this.char = nativeEvent.key;
    this.shiftKey = nativeEvent.shiftKey;
    this.altKey = nativeEvent.altKey;
    this.ctrlKey = nativeEvent.ctrlKey;
  }
}
