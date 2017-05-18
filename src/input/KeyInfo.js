/**
 * Holds information about keyboard event.
 *
 * @cat input
 */
/* @echo EXPORT */
class KeyInfo {

  /**
   * constructor - Description
   *
   * @param {Event} nativeEvent Description
   *
   * @return {void} Description
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
