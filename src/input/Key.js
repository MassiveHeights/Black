/**
 * @readonly
 * @enum {number}
 * @cat input
 */
const Key = {
  /**
   * @type {number}
   */
  A: 65,
  /**
   * @type {number}
   */
  B: 66,
  /**
   * @type {number}
   */
  C: 67,
  /**
   * @type {number}
   */
  D: 68,
  /**
   * @type {number}
   */
  E: 69,
  /**
   * @type {number}
   */
  F: 70,
  /**
   * @type {number}
   */
  G: 71,
  /**
   * @type {number}
   */
  H: 72,
  /**
   * @type {number}
   */
  I: 73,
  /**
   * @type {number}
   */
  J: 74,
  /**
   * @type {number}
   */
  K: 75,
  /**
   * @type {number}
   */
  L: 76,
  /**
   * @type {number}
   */
  M: 77,
  /**
   * @type {number}
   */
  N: 78,
  /**
   * @type {number}
   */
  O: 79,
  /**
   * @type {number}
   */
  P: 80,
  /**
   * @type {number}
   */
  Q: 81,
  /**
   * @type {number}
   */
  R: 82,
  /**
   * @type {number}
   */
  S: 83,
  /**
   * @type {number}
   */
  T: 84,
  /**
   * @type {number}
   */
  U: 85,
  /**
   * @type {number}
   */
  V: 86,
  /**
   * @type {number}
   */
  W: 87,
  /**
   * @type {number}
   */
  X: 88,
  /**
   * @type {number}
   */
  Y: 89,
  /**
   * @type {number}
   */
  Z: 90,
  /**
   * @type {number}
   */
  DIGIT_0: 48,
  /**
   * @type {number}
   */
  DIGIT_1: 49,
  /**
   * @type {number}
   */
  DIGIT_2: 50,
  /**
   * @type {number}
   */
  DIGIT_3: 51,
  /**
   * @type {number}
   */
  DIGIT_4: 52,
  /**
   * @type {number}
   */
  DIGIT_5: 53,
  /**
   * @type {number}
   */
  DIGIT_6: 54,
  /**
   * @type {number}
   */
  DIGIT_7: 55,
  /**
   * @type {number}
   */
  DIGIT_8: 56,
  /**
   * @type {number}
   */
  DIGIT_9: 57,
  /**
   * @type {number}
   */
  NUMPAD_0: 96,
  /**
   * @type {number}
   */
  NUMPAD_1: 97,
  /**
   * @type {number}
   */
  NUMPAD_2: 98,
  /**
   * @type {number}
   */
  NUMPAD_3: 99,
  /**
   * @type {number}
   */
  NUMPAD_4: 100,
  /**
   * @type {number}
   */
  NUMPAD_5: 101,
  /**
   * @type {number}
   */
  NUMPAD_6: 102,
  /**
   * @type {number}
   */
  NUMPAD_7: 103,
  /**
   * @type {number}
   */
  NUMPAD_8: 104,
  /**
   * @type {number}
   */
  NUMPAD_9: 105,
  /**
   * @type {number}
   */
  NUMPAD_MULTIPLY: 106,
  /**
   * @type {number}
   */
  NUMPAD_ADD: 107,
  /**
   * @type {number}
   */
  NUMPAD_SUBTRACT: 109,
  /**
   * @type {number}
   */
  NUMPAD_DECIMAL: 110,
  /**
   * @type {number}
   */
  NUMPAD_DIVIDE: 111,
  /**
   * @type {number}
   */
  LEFT_ARROW: 37,
  /**
   * @type {number}
   */
  UP_ARROW: 38,
  /**
   * @type {number}
   */
  RIGHT_ARROW: 39,
  /**
   * @type {number}
   */
  DOWN_ARROW: 40,
  /**
   * @type {number}
   */
  BACKSPACE: 8,
  /**
   * @type {number}
   */
  TAB: 9,
  /**
   * @type {number}
   */
  ENTER: 13,
  /**
   * @type {number}
   */
  SHIFT: 16,
  /**
   * @type {number}
   */
  CTRL: 17,
  /**
   * @type {number}
   */
  ALT: 18,
  /**
   * @type {number}
   */
  F1: 112,
  /**
   * @type {number}
   */
  F2: 113,
  /**
   * @type {number}
   */
  F3: 114,
  /**
   * @type {number}
   */
  F4: 115,
  /**
   * @type {number}
   */
  F5: 116,
  /**
   * @type {number}
   */
  F6: 117,
  /**
   * @type {number}
   */
  F7: 118,
  /**
   * @type {number}
   */
  F8: 119,
  /**
   * @type {number}
   */
  F9: 120,
  /**
   * @type {number}
   */
  F10: 121,
  /**
   * @type {number}
   */
  F11: 122,
  /**
   * @type {number}
   */
  F12: 123,
  /**
   * @type {number}
   */
  PAUSE_BREAK: 19,
  /**
   * @type {number}
   */
  CAPS_LOCK: 20,
  /**
   * @type {number}
   */
  ESCAPE: 27,
  /**
   * @type {number}
   */
  PAGE_UP: 33,
  /**
   * @type {number}
   */
  PAGE_DOWN: 34,
  /**
   * @type {number}
   */
  END: 35,
  /**
   * @type {number}
   */
  HOME: 36,
  /**
   * @type {number}
   */
  INSERT: 45,
  /**
   * @type {number}
   */
  DELETE: 46,
  /**
   * @type {number}
   */
  LEFT_WINDOW: 91,
  /**
   * @type {number}
   */
  RIGHT_WINDOW: 92,
  /**
   * @type {number}
   */
  CONTEXT_MENU: 93,
  /**
   * @type {number}
   */
  NUM_LOCK: 144,
  /**
   * @type {number}
   */
  SCROLL_LOCK: 145,
  /**
   * @type {number}
   */
  SEMI_COLON: 186,
  /**
   * @type {number}
   */
  EQUAL_SIGN: 187,
  /**
   * @type {number}
   */
  COMMA: 188,
  /**
   * @type {number}
   */
  DASH: 189,
  /**
   * @type {number}
   */
  PERIOD: 190,
  /**
   * @type {number}
   */
  FORWARD_SLASH: 191,
  /**
   * @type {number}
   */
  BACKQUOTE: 192,
  /**
   * @type {number}
   */
  BRAKET_LEFT: 219,
  /**
   * @type {number}
   */
  BACK_SLASH: 220,
  /**
   * @type {number}
   */
  BRAKET_RIGHT: 221,
  /**
   * @type {number}
   */
  SINGLE_QUOTE: 222,
  /**
   * @type {number}
   */
  SPACE: 32
};

export { Key };