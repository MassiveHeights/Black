/**
 * Message holds all information about dispatched event. This is a pooled object.
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

    /** @type {Object} `GameObject` which receives this message. */
    this.target = null;

    /** @type {Object} The point from which sending is begun. */
    this.origin = null;

    /** @type {boolean} Specifies if invocation of this message was canceled. */
    this.canceled = false;

    /** @type {MessageType} Message type. See `MessageType` enum. */
    this.type = MessageType.DIRECT;
  }

  /**
   * Cancels message invocation.
   *
   * @return {void}
   */
  cancel() {
    this.canceled = true;
  }

  // @ifdef DEBUG
  /**
   * Generates message string representation.
   *
   * @return {string}
   */
  toString() {
    let name = '';

    let isGameObject = this.sender instanceof GameObject;
    if (isGameObject === true)
      name = /** @type {GameObject}*/ (this.sender).name;

    return `MESSAGE: { name: '${this.name}', sender: '${name}', target: '${this.target.name}', path: '${this.path}' }`;
  }
  // @endif

  /**
   * @ignore
   * @returns {Message}
   */
  __reset() {
    this.sender = null;
    this.name = '';
    this.target = null;
    this.canceled = false;
    this.type = MessageType.DIRECT;
    return this;
  }
}

/**
 * Pool for messages.
 *
 * @type {ObjectPool}
 * @nocollapse
 *
 */
Message.pool = new ObjectPool(Message);

/** 
 * @const 
 * @public 
 * @type {string} 
 */
Message.PROGRESS = 'progress';

/** 
 * @const 
 * @public 
 * @type {string} 
 */
Message.COMPLETE = 'complete';

/** 
 * @const 
 * @public 
 * @type {string} 
 */
Message.ERROR = 'error';

/** 
 * @const 
 * @public 
 * @type {string} 
 */
Message.CHANGE = 'change';

/** 
 * @const 
 * @public 
 * @type {string} 
 */
Message.READY = 'ready';

/** 
 * @const 
 * @public 
 * @type {string} 
 */
Message.UPDATE = 'update';

/** 
 * @const 
 * @public 
 * @type {string} 
 */
Message.RESIZE = 'resize';