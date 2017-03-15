/**
 * MessageDispatcher - Description
 * @unrestricted
 */
/* @echo EXPORT */
class MessageDispatcher {
  constructor() {
    // object of arrays

    /** @type {Object<string, Array>} */
    this.mListeners = null;
  }

  /**
   * on - Description
   *
   * @param {string} name           Description
   * @param {Function} callback       Description
   * @param {Object=} [context=null] Description
   *
   * @return {void} Description
   */
  on(name, callback, context = null) {
    if (this.mListeners === null)
      this.mListeners = {};

    if (this.mListeners.hasOwnProperty(name) === false)
      this.mListeners[name] = [];

    let dispatchers = /** @type {Array<{callback: Function, context}>} */ (this.mListeners[name]);

    for (let i = 0; i < dispatchers.length; i++)
      if (dispatchers[i].callback === callback)
        return;

      // if (dispatchers.indexOf(callback) !== -1)
      //   return;

    dispatchers.push({
      callback: callback,
      context: context
    });
  }


  /**
   * removeOn - Description
   *
   * @param {string} name            Description
   * @param {Function=} [callback=null] Description
   *
   * @return {void} Description
   */
  removeOn(name, callback = null) {
    if (name === null || name.length === 0)
      throw new Error('Name cannot be null.');

    if (this.mListeners === null)
      return;

    let dispatchers = /** @type {Array<{callback: Function, context}>} */ (this.mListeners[name]);

    if (dispatchers === undefined)
      return;

    if (callback === null) {
      dispatchers.splice(0, dispatchers.length);
      return;
    }

    for (let i = dispatchers.length; i--;) {
      if (dispatchers[i].callback === callback) {
        dispatchers.splice(i, 1);
        return;
      }
    }
  }


  /**
   * sendMessage - Description
   *
   * @param {string}  name   Description
   * @param {...*} params Description
   *
   * @return {void} Description
   */
  sendMessage(name, ...params) {
    // TODO: add wildcard support and name mask annotation support
    if (name === null || name.length === 0)
      throw new Error('Name cannot be null.');

    let message = this.__parseMessage(this, name);

    // TODO: o'really 62?
    let isGameObject = this instanceof GameObject;
    if (message.mDirection !== 'none' && isGameObject === false)
      throw new Error('Dispatching not direct messages are not allowed on non Game Objects.');

    if (message.mDirection === 'none') {
      this.__invoke(this, message, ...params);
    } else if (message.mDirection === 'down') {
      message.mOrigin = (/** @type {GameObject} */ (this)).root;

      if (message.mSibblings === true)
        this.__sendGlobal(this, message, null, ...params);
      else
        this.__sendBubbles(this, message, false, ...params);
    } else if (message.mDirection === 'up') {
      this.__sendBubbles(this, message, true, ...params);
    } else {
      throw new Error('Unknown message type.');
    }
  }


  /**
   * __sendBubbles - Description
   *
   * @param {*}  sender  Description
   * @param {string}  message Description
   * @param {boolean}  toTop   Description
   * @param {...*} params  Description
   *
   * @return {void} Description
   */
  __sendBubbles(sender, message, toTop, ...params) {
    message.mOrigin = toTop === true ? this : (/** @type {GameObject} */ (this)).root;

    let list = [this];

    let current = /** @type {GameObject} */ (this);
    while (current.parent !== null) {
      list.push(current.parent);
      current = current.parent;
    }

    if (toTop) {
      for (let i = 0; i < list.length; i++) {
        let dispatcher = /** @type {GameObject} */ (list[i]);
        dispatcher.__invoke(sender, message, ...params);
      }
    } else {
      for (let i = list.length - 1; i >= 0; i--) {
        let dispatcher = /** @type {GameObject} */ (list[i]);
        dispatcher.__invoke(sender, message, ...params);
      }
    }
  }


  /**
   * __sendGlobal - Description
   *
   * @param {*}  sender  Description
   * @param {Message}  message Description
   * @param {GameObject=}  origin  Description
   * @param {...*} params  Description
   *
   * @return {void} Description
   */
  __sendGlobal(sender, message, origin, ...params) {
    if (origin === null)
      origin = /** @type {GameObject} */ (message.mOrigin);

    origin.__invoke(sender, message, ...params);

    for (let i = 0; i < origin.numChildren; i++) {
      let child = origin.getChildAt(i);
      child.__sendGlobal(sender, message, child, ...params);
    }
  }


  /**
   * __invoke - Description
   *
   * @param {*}  sender  Description
   * @param {Message}  message Description
   * @param {...*} params  Description
   *
   * @return {void} Description
   */
  __invoke(sender, message, ...params) {
    if (this.mListeners === null)
      return;

    let dispatchers = /** @type {Array<{callback: Function, context}>} */ (this.mListeners[message.mName]);

    if (dispatchers === undefined || dispatchers.length === 0)
      return;

    // no path filter found - just invoke it
    let clone = dispatchers.slice(0);
    //let msg = new Message(sender, queryObject.name);

    for (let i = 0; i < clone.length; i++) {
      let dispatcher = /** @type {{callback: Function, context: *}} */ (clone[i]);
      message.mTarget = this;
      dispatcher.callback.call(dispatcher.context, message, ...params);
    }
  }

  // TODO: parse exception path'ses like: ~tatata@@@omg####imnotidiout###@@~~
  /**
   * __parseMessage - Description
   *
   * @param {*} sender Description
   * @param {string} info   Description
   *
   * @return {Message} Description
   */
  __parseMessage(sender, info) {
    // TODO: make message pool... this type of objects shall not be
    // but dont forget to take care about cancel property
    let result = new Message();
    result.mSender = sender;
    result.mDirection = 'none';
    result.mSibblings = true;
    result.mPathMask = null;
    result.mComponentMask = null;


    if (info.charAt(0) === '~') {
      result.mSibblings = false;
      result.mDirection = 'up';
    }

    let ixAt = info.indexOf('@');
    let ixHash = info.indexOf('#');

    if (ixAt === -1 && ixHash === -1) {
      result.mSibblings = false;
      result.mName = info.substr(result.mDirection === 'up' ? 1 : 0);
      return result;
    }

    result.mDirection = 'down';

    if (ixHash === -1) { // we got no hash but we have a dog
      result.mName = info.substring(result.mSibblings ? 0 : 1, ixAt);

      if (info.length === ixAt + 1)
        result.mPathMask = null;
      else
        result.mPathMask = info.substring(ixAt + 1);

      return result;
    } else {
      if (ixAt !== -1) {
        result.mPathMask = info.substring(ixAt + 1, ixHash);
        result.mName = info.substring(result.mSibblings ? 0 : 1, ixAt);
      } else {
        result.mName = info.substring(result.mSibblings ? 0 : 1, ixHash);
      }

      if (info.length === ixHash + 1)
        result.mComponentMask = null;
      else
        result.mComponentMask = info.substring(ixHash + 1);
      return result;
    }
  }
}

/* @echo EXPORT */
class Message {
  constructor() {
    /** @private @type {*} */
    this.mSender = null;

    /** @private @type {string} */
    this.mName;

    /** @private @type {string|null} */
    this.mPathMask = null;

    /** @private @type {string|null} */
    this.mComponentMask = null;

    /** @private @type {string} */
    this.mDirection = 'none';

    /** @private @type {boolean} */
    this.mSibblings = false;

    /** @private @type {Object} */
    this.mOrigin = null;

    /** @private @type {Object} */
    this.mTarget = null;

    /** @private @type {boolean} */
    this.mCanceled = false;
  }


  /**
   * sender - Who send the message
   *
   * @return {*} Description
   */
  get sender() {
    return this.mSender;
  }


  /**
   * name - The name of the message
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }


  /**
   * direction - direction in what message was sent. Can be 'none', 'up' and 'down'.
   *
   * @return {string}
   */
  get direction() {
    return this.mDirection;
  }


  /**
   * sibblings - Indicates if sibblings should be included into dispatching process.
   *
   * @return {boolean} Description
   */
  get sibblings() {
    return this.mSibblings;
  }


  /**
   * pathMask - The GameObject.name mask string if was used.
   *
   * @return {string|null} Description
   */
  get pathMask() {
    return this.mPathMask;
  }


  /**
   * componentMask - Component mask string if was used.
   *
   * @return {string|null}
   */
  get componentMask() {
    return this.mComponentMask;
  }


  /**
   * origin - The original sender of a message.
   *
   * @return {*|null}
   */
  get origin() {
    return this.mOrigin;
  }


  /**
   * target - The destination object for this message.
   *
   * @return {*|null}
   */
  get target() {
    return this.mTarget;
  }


  /**
   * cancel - Stops propagation of the message.
   *
   * @return {void}
   */
  cancel() {
    this.mCanceled = true;
  }


  /**
   * canceled - True/False if
   *
   * @return {boolean}
   */
  get canceled() {
    return this.mCanceled;
  }

  static get PROGRESS() { return 'progress'; }
  static get COMPLETE() { return 'complete'; }
}
