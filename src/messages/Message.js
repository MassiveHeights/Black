/**
 * Message holds all information about dispatched event.
 *
 * @cat core
 */
/* @echo EXPORT */
class Message {
  constructor() {
    /** @type {MessageDispatcher} The `MessageDispatcher` object, which posted this message. */
    this.sender = null;

    /** @type {string} The name of message. */
    this.name = '';

    /** @type {string|null} */
    this.pathMask = null;

    /** @type {string|null} */
    this.componentMask = null;

    /** @type {Object} `GameObject` which receives this message. */
    this.target = null;

    /** @type {MessageDispatcher} `GameObject` the message starts to invoke from. */
    this.origin = null;

    /** @type {boolean} Specifies if invocation of this message was canceled. */
    this.canceled = false;

    /** @type {MessageType} Message type. See `MessageType` enum. */
    this.type = MessageType.NONE; // 0 - none, 1 - bubbling, 2 - invoking
  }

  /**
   * Gets path
   *
   * @return {string|null}
   */
  get path() {
    let hasComponentMask = this.componentMask !== null;

    if (this.pathMask !== null)
      return hasComponentMask === true ? this.pathMask + '#' + this.componentMask : this.pathMask;
    else if (hasComponentMask === true)
      return this.componentMask;

    return null;
  }

  /**
   * Cancels message invocation
   *
   * @return {void}
   */
  cancel() {
    this.canceled = true;
  }

  /**
   * Generates message string representation
   *
   * @return {string}
   */
  toString() {
    return `MESSAGE: { name: '${this.name}', sender: '${this.sender.name}', target: '${this.target.name}', path: '${this.path}' }`;
  }

  /**
   * @event Message#progress
   */
  static get PROGRESS() { return 'progress'; }
  /**
   * @event Message#complete
   */
  static get COMPLETE() { return 'complete'; }
}

/**
 * 
 * @cat core
 * @static
 * @constant
 * @enum {string}
 */
/* @echo EXPORT */
const MessageType = {
  NONE:    'none',
  BUBBLE:  'bubble',
  CAPTURE: 'capture',
  GLOBAL:  'global'
};