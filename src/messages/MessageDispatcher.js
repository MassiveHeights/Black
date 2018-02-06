/**
 * The MessageDispatcher class is the base class for all classes that posts messages.
 *
 * Global messages will not be dispatched on non GameObject objects.
 *
 * @cat core
 * @unrestricted
 */
/* @echo EXPORT */
class MessageDispatcher {
  /**
   * Creates new instance of MessageDispatcher.
   */
  constructor() {
    /**
     * @private
     * @type {Object<string, Array>}
     */
    this.mListeners = null;
  }

  /**
   * Adds listener by given name and callback.
   *
   * @public
   * @param {string} message Message name.
   * @param {Function} [callback] Function to be called on message send.
   * @param {*} [context=null] Object to be used as `this` in callback function.
   * @return {void}
   */
  on(message, callback, context = null) {
    this.__on(message, callback, false, this, context);
  }

  // once(message, callback, context = null) {
  //   this.__on(message, callback, true, this, context);
  // }

  /**
  * Returns true if this object is subscribed for any messages with a given name.
  *
  * @public
  * @param {string} message Message name to check.
  * @returns {boolean} True if found.
  */
  hasOn(message) {
    Debug.assert(message !== null, `Param 'message' cannot be null.`);

    let filterIx = message.indexOf('@');
    if (filterIx !== -1) {
      let pureName = message.substring(0, filterIx);
      let global = MessageDispatcher.mOverheardHandlers;

      if (global.hasOwnProperty(pureName) === false)
        return false;

      let listeners = global[pureName];
      for (let i = 0; i < listeners.length; i++)
        if (listeners[i].owner === this)
          return true;

      return false;
    } else {
      if (this.mListeners === null)
        return false;

      if (this.mListeners.hasOwnProperty(message) === false)
        return false;
    }

    return true;
  }

  /**
   * Removes listener by given name and callback.
   * If callback is null then all callbacks will be removed.
   *
   * @public
   * @param {string} message Message name.
   * @param {Function=} [callback=null] Function to be removed from listeners.
   * @param {*} [context=null] Object, which corresponds to callback function.
   * @return {void}
   */
  off(message, callback = null, context = null) {
    Debug.assert(message !== null, 'name cannot be null.');

    let filterIx = message.indexOf('@');
    if (filterIx !== -1) {
      let pureName = message.substring(0, filterIx);
      let pathMask = message.substring(filterIx + 1);
      let global = MessageDispatcher.mOverheardHandlers;

      if (global.hasOwnProperty(pureName) === false)
        return;

      let dispatchers = (global[pureName]);
      if (callback === null) {
        for (let i = dispatchers.length; i--;)
          if (dispatchers[i].owner === this)
            dispatchers.splice(i, 1);
      } else {
        for (let i = dispatchers.length; i--;) {
          if (dispatchers[i].owner === this && dispatchers[i].callback === callback) {
            dispatchers.splice(i, 1);
            return;
          }
        }
      }
      return;
    } else {
      if (this.mListeners === null)
        return;

      let dispatchers = (this.mListeners[message]);

      if (dispatchers === undefined)
        return;

      if (callback === null) {
        dispatchers.splice(0, dispatchers.length);
        return;
      } else {
        for (let i = dispatchers.length; i--;) {
          if (dispatchers[i].callback === callback && dispatchers[i].context === context) {
            dispatchers.splice(i, 1);
            return;
          }
        }
      }
    }
  }

  /**
   * Sends message with given pattern and params
   *
   * @public
   * @param {string} message  The name of a message
   * @param {...*=} payload A list of params to send
   * @return {void}
   */
  post(message, ...payload) {
    Debug.assert(message !== null, `Param 'name' cannot be null.`);

    let msg = this.__parseMessage(this, message);

    let isGameObjectOrComponent = this instanceof GameObject || this instanceof Component;
    if (msg.type === MessageType.BUBBLE && isGameObjectOrComponent === false)
      throw new Error('Posting not direct messages are not allowed on non Game Objects.');

    if (msg.type === MessageType.NONE) {
      this.__invoke(this, msg, ...payload);

      if (msg.canceled === false)
        this.__invokeComponents(this, msg, ...payload);

      if (msg.canceled === false)
        this.__invokeOverheard(this, msg, ...payload);
      return;
    }

    if (msg.type === MessageType.GLOBAL) {
      msg.origin = this.stage;

      this.__postGlobal(this, msg, null, ...payload);

      if (msg.canceled === false)
        msg.origin.__invokeOverheard(this, msg, ...payload);
      return;
    }

    if (msg.type === MessageType.BUBBLE) {
      this.__postBubbles(this, msg, true, ...payload);

      if (msg.canceled === false)
        msg.sender.__invokeOverheard(msg.sender, msg, ...payload);
      return;
    }

    if (msg.type === MessageType.CAPTURE) {
      this.__postBubbles(this, msg, false, ...payload);

      if (msg.canceled === false)
        msg.sender.__invokeOverheard(msg.sender, msg, ...payload);
      return;
    }
  }

  /**
   * @private
   * @ignore
   * @param {MessageDispatcher} sender 
   * @param {string} message 
   * @return {Message}
   */
  __parseMessage(sender, message) {
    const result = new Message();
    const hasTilda = message.charAt(0) === '~';
    const ixAt = message.indexOf('@');
    const ixHash = message.indexOf('#');

    result.sender = sender;

    if (ixAt === -1 && ixHash === -1) {
      result.type = hasTilda ? MessageType.BUBBLE : MessageType.NONE;
      result.name = hasTilda ? message.substring(1) : message;
      return result;
    }

    // path or component mask found so lets its not local anymore
    result.type = hasTilda ? MessageType.CAPTURE : MessageType.GLOBAL;

    // we got a dog but no prison
    if (ixAt >= 0 && ixHash === -1) {
      result.name = hasTilda ? message.substring(1, ixAt) : message.substring(0, ixAt);
      result.pathMask = message.substring(ixAt + 1);

      if (result.pathMask === '')
        result.pathMask = '*';

      return result;
    }

    // we got into prison without the dog
    if (ixAt === -1 && ixHash >= 0) {
      result.name = hasTilda ? message.substring(1, ixHash) : message.substring(0, ixHash);
      result.pathMask = '*';
      result.componentMask = message.substring(ixHash + 1);
      return result;
    }

    // both prison and the dog
    if (ixAt !== -1 && ixHash !== -1) {
      result.name = hasTilda ? message.substring(1, ixAt) : message.substring(0, ixAt);
      result.pathMask = message.substring(ixAt + 1, ixHash);
      result.componentMask = message.substring(ixHash + 1);
      return result;
    }
  }

  /**
   * @private
   * @ignore
   * @param {string} message
   * @param {Function=} callback 
   * @param {boolean} [isOnce=false]
   * @param {MessageDispatcher} [owner=null]
   * @param {*} [context=null]
   * @return {void}
   */
  __on(message, callback, isOnce = false, owner = null, context = null) {
    Debug.assert(message !== null, 'message cannot be null.');
    Debug.assert(message.trim().length > 0, 'message cannot be null.');
    Debug.assert(callback !== null, 'callback cannot be null.');
    Debug.assert(!(message.indexOf('~') === 0), 'Not allowed. Use regular method.');

    let earIndex = message.indexOf('@');
    if (earIndex !== -1) {
      let messageName = message.substring(0, earIndex);
      let pathMask = message.substring(earIndex + 1);
      let global = MessageDispatcher.mOverheardHandlers;

      if (global.hasOwnProperty(messageName) === false)
        global[messageName] = [];

      let dispatchers = (global[messageName]);
      dispatchers.push(new MessageBinding(message, callback, isOnce, owner, context, pathMask));
      return;
    }

    if (this.mListeners === null)
      this.mListeners = {};

    if (this.mListeners.hasOwnProperty(message) === false)
      this.mListeners[message] = [];

    let dispatchers = (this.mListeners[message]);
    dispatchers.push(new MessageBinding(message, callback, isOnce, owner, context));
  }

  /**
   * @private
   * @ignore
   * @param {MessageDispatcher} sender 
   * @param {Message} message 
   * @param {...*} params 
   * @return {void}
   */
  __invoke(sender, message, ...params) {
    if (message.canceled === true)
      return;

    if (this.stage === null)
      return;

    if (this.mListeners === null)
      return;

    let dispatchers = (this.mListeners[message.name]);

    if (dispatchers === undefined || dispatchers.length === 0)
      return;

    if (message.path !== null) {
      let inPath = this.__checkPath(this.path, message.path);
      if (!inPath)
        return;
    }

    // no path filter found - just invoke it
    let clone = dispatchers.slice(0);

    for (let i = 0; i < clone.length; i++) {
      let dispatcher = clone[i];
      message.target = this;
      dispatcher.callback.call(dispatcher.context, message, ...params);

      if (message.canceled === true)
        return;
    }
  }

  /**
   * @private
   * @ignore
   * @param {MessageDispatcher} sender 
   * @param {Message} message 
   * @param {...*} params 
   * @return {void}
   */
  __invokeComponents(sender, message, ...params) {
    if (message.canceled === true)
      return;

    let isGameObject = this instanceof GameObject;
    if (isGameObject === false)
      return;

    if (this.stage === null)
      return;

    let go = /** @type {GameObject} */ (this);

    let len = go.mComponents.length;
    for (let i = 0; i < len; i++) {
      let c = go.mComponents[i];
      c.__invoke(sender, message, ...params);

      if (message.canceled === true)
        return;
    }
  }

  /**
   * @private
   * @ignore
   * @param {MessageDispatcher}  sender
   * @param {Message}  message
   * @param {...*} params
   * @return {void}
   */
  __invokeOverheard(sender, message, ...params) {
    if (message.canceled === true)
      return;

    let dispatchers = MessageDispatcher.mOverheardHandlers[message.name];

    if (dispatchers === undefined || dispatchers.length === 0)
      return;

    let clone = dispatchers.slice(0);

    for (let i = 0; i < clone.length; i++) {
      let dispatcher = clone[i];

      if (!this.__checkPath(sender.path, dispatcher.pathMask))
        continue;

      if (dispatcher.owner.stage == null)
        continue;

      message.target = this;
      dispatcher.callback.call(dispatcher.context, message, ...params);

      if (message.canceled === true)
        return;
    }
  }

  /**
 * @private
 * @ignore
 * @param {*}  sender
 * @param {Message}  message
 * @param {GameObject=}  origin
 * @param {...*} params
 * @return {void}
 */
  __postGlobal(sender, message, origin, ...params) {
    if (origin === null)
      origin = /** @type {GameObject} */ (message.origin);

    origin.__invoke(sender, message, ...params);
    origin.__invokeComponents(sender, message, ...params);

    for (let i = 0; i < origin.numChildren; i++) {
      let child = origin.getChildAt(i);
      child.__postGlobal(sender, message, child, ...params);
    }
  }

  /**
   * @private
   * @ignore
   * @param {*}  sender
   * @param {Message}  message
   * @param {boolean}  toTop
   * @param {...*} params
   * @return {void}
   */
  __postBubbles(sender, message, toTop, ...params) {
    message.origin = toTop === true ? this : this.stage;

    let list = [this];

    let current = /** @type {GameObject|Component} */ (this);
    if (this instanceof Component) {
      if (current.gameObject !== null) {
        list.push(current.gameObject);
        current = current.gameObject;
      }
    }

    while (current.parent !== null) {
      list.push(current.parent);
      current = current.parent;
    }

    if (toTop) {
      for (let i = 0; i < list.length; i++) {
        let dispatcher = /** @type {GameObject} */ (list[i]);
        dispatcher.__invoke(sender, message, ...params);
        dispatcher.__invokeComponents(sender, message, ...params);
      }
    } else {
      for (let i = list.length - 1; i >= 0; i--) {
        let dispatcher = /** @type {GameObject} */ (list[i]);
        dispatcher.__invoke(sender, message, ...params);
        dispatcher.__invokeComponents(sender, message, ...params);
      }
    }
  }

  /**
   * @private
   * @ignore
   * @param {string} path
   * @param {string} pathMask
   * @return {boolean}
   */
  __checkPath(path, pathMask) {
    if (path == null || pathMask == null)
      return false;

    if (path === pathMask)
      return true;

    if (pathMask.indexOf('*') === -1)
      return path === pathMask;
    else
      return new RegExp("^" + pathMask.split("*").join(".*") + "$").test(path);
  }

}

/**
 * @cat core
 * @ignore
 */
class MessageBinding {
  /**
   * @ignore
   * @param {string} name 
   * @param {Function} callback 
   * @param {boolean} isOnce 
   * @param {MessageDispatcher} owner 
   * @param {*=} [context=null]
   * @param {string=} [pathMask=null]
   */
  constructor(name, callback, isOnce, owner, context = null, pathMask = null) {
    /** @type {string} */
    this.name = name;

    /** @type {Function} */
    this.callback = callback;

    /** @type {boolean} */
    this.isOnce = isOnce;

    /** @type {MessageDispatcher} */
    this.owner = owner;

    /** @type {*} */
    this.context = context;

    // for overhearing
    /** @type {string} */
    this.pathMask = pathMask;
  }

  /**
   * @param {MessageBinding} binding 
   * @returns {boolean}
   */
  equals(binding) {
    return this.name === binding.name && this.owner === binding.owner;
  }
}

/**
 * @private
 * @dict
 */
MessageDispatcher.mOverheardHandlers = {};