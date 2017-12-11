/**
 * Message holds all information about dispatched event.
 *
 * @cat core
 */
/* @echo EXPORT */
class Message {
  constructor() {
    /** @type {*} */
    this.sender = null;

    /** @type {string} */
    this.name;

    /** @type {string|null} */
    this.pathMask = null;

    /** @type {string|null} */
    this.componentMask = null;

    /** @type {Object} */
    this.target = null;

    /** @type {Object} */
    this.origin = null;

    /** @type {boolean} */
    this.canceled = false;

    /** @type {MessageType} */
    this.type = MessageType.NONE; // 0 - none, 1 - bubbling, 2 - invoking
  }

  /**
   * @return {string|null}
   */
  get path() {
    var hasComponentMask = this.componentMask !== null;

    if (this.pathMask !== null)
      return hasComponentMask === true ? this.pathMask + '#' + this.componentMask : this.pathMask;
    else if (hasComponentMask === true)
      return this.componentMask;

    return null;
  }

  cancel() {
    this.canceled = true;
  }

  toString() {
    return `MESSAGE: { name: '${this.name}', sender: '${this.sender.name}', target: '${this.target.name}', path: '${this.path}' }`;
  }

  static get PROGRESS() { return 'progress'; }
  static get COMPLETE() { return 'complete'; }
}

/* @echo EXPORT */
var MessageType = {
  NONE:    'none',
  BUBBLE:  'bubble',
  CAPTURE: 'capture',
  GLOBAL:  'global'
};