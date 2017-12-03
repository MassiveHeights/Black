/**
 * The MessageDispatcher class is the base class for all classes that posts messages.
 *
 * Global messages will not be dispatched on non GameObject objects.
 *
 *
 *
 * @cat core
 * @unrestricted
 */
/* @echo EXPORT */
class MessageDispatcher {
  constructor() {
    // object of arrays

    /**
     * @private
     * @type {Object<string, Array>}
     */
    this.mListeners = null;
  }

  /**
   * Listens to message by given name
   *
   * @param {string} name           Name of a message to listen
   * @param {Function} callback       The callback function
   * @param {Object=} [context=null] The context for callback function
   *
   * @return {void}
   */
  on(name, callback, context = null) {
    Debug.assert(name !== null, 'name cannot be null.');
    Debug.assert(callback !== null, 'callback cannot be null.');

    // TODO: refactor, expore dispatching provider
    let filterIx = name.indexOf('@');
    if (filterIx !== -1) {
      // global handler

      let pureName = name.substring(0, filterIx);
      let pathMask = name.substring(filterIx + 1);

      if (MessageDispatcher.mOverheardHandlers.hasOwnProperty(pureName) === false)
        MessageDispatcher.mOverheardHandlers[pureName] = [];

      let dispatchers = (MessageDispatcher.mOverheardHandlers[pureName]);
      // for (let i = 0; i < dispatchers.length; i++)
      //   if (dispatchers[i].callback === callback)
      //     return;

      dispatchers.push({
        callback: callback,
        context: context,
        pathMask: pathMask
      });

      return;
    }

    if (this.mListeners === null)
      this.mListeners = {};

    if (this.mListeners.hasOwnProperty(name) === false)
      this.mListeners[name] = [];

    let dispatchers = /** @type {Array<{callback: Function, context}>} */ (this.mListeners[name]);

    // TODO: check for dups somehow
    // for (let i = 0; i < dispatchers.length; i++)
    //   if (dispatchers[i].callback === callback)
    //     return;

    dispatchers.push({
      callback: callback,
      context: context
    });
  }

  /**
   * Returns true if this object is subscribed for any messages with a given name.
   *
   * @param {string} name Message name to check.
   *
   * @returns {boolean} True if found.
   */
  hasOn(name) {
    Debug.assert(name !== null, 'name cannot be null.');

    let filterIx = name.indexOf('@');
    if (filterIx !== -1) {
      let pureName = name.substring(0, filterIx);
      if (MessageDispatcher.mOverheardHandlers.hasOwnProperty(pureName) === false)
        return false;
    } else {
      if (this.mListeners === null)
        return false;
      else if (this.mListeners.hasOwnProperty(name) === false)
        return false;
    }

    return true;
  }

  /**
   * Removes listener.
   * If callback is null then all callbacks will be removed.
   *
   * @param {string} name
   * @param {Function=} [callback=null]
   *
   * @return {void}
   */
  removeOn(name, callback = null) {
    Debug.assert(name !== null, 'name cannot be null.');
    //Debug.assert(callback !== null, 'callback cannot be null.');

    let filterIx = name.indexOf('@');
    if (filterIx !== -1) {
      //we are working with overheared message
      let pureName = name.substring(0, filterIx);
      let pathMask = name.substring(filterIx + 1);

      if (MessageDispatcher.mOverheardHandlers.hasOwnProperty(pureName) === false)
        return;

      let dispatchers = (MessageDispatcher.mOverheardHandlers[pureName]);

      if (callback === null) {
        dispatchers.splice(0, dispatchers.length);
        return;
      } else {
        for (let i = dispatchers.length; i--;) {
          if (dispatchers[i].callback === callback) {
            dispatchers.splice(i, 1);
            return;
          }
        }
      }

    } else {
      // regular message
      if (this.mListeners === null)
        return;

      let dispatchers = /** @type {Array<{callback: Function, context}>} */ (this.mListeners[name]);

      if (dispatchers === undefined)
        return;

      if (callback === null) {
        dispatchers.splice(0, dispatchers.length);
        return;
      } else {
        for (let i = dispatchers.length; i--;) {
          if (dispatchers[i].callback === callback) {
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
   * @param {string}  name   The name of a message
   * @param {...*} params A list of params to send
   *
   * @return {void}
   */
  post(name, ...params) {
    // TODO: add wildcard support and name mask annotation support
    Debug.assert(name !== null, 'name cannot be null.');
    // if (name === null || name.length === 0)
    //   throw new Error('Name cannot be null.');

    let message = this.__parseMessage(this, name);

    //if (message.name === null && message.name === '')
    Debug.assert(message.name !== '', 'Message.name cannot be null.');  

    // TODO: o'really 62?
    let isGameObjectOrComponent = this instanceof GameObject || this instanceof Component;
    if (message.mDirection !== 'none' && isGameObjectOrComponent === false)
      throw new Error('Dispatching not direct messages are not allowed on non Game Objects.');

    if (message.mDirection === 'none') {
      this.__invoke(this, message, ...params);
      this.__invokeComponents(this, message, ...params);
      this.__invokeOverheard(this, message, ...params);
    } else if (message.mDirection === 'down') {
      message.mOrigin = ( /** @type {GameObject} */ (this)).stage;

      if (message.mSibblings === true) {
        this.__sendGlobal(this, message, null, ...params);
        message.mOrigin.__invokeOverheard(this, message, ...params);
      } else {
        this.__sendBubbles(this, message, false, ...params);
        message.mSender.__invokeOverheard(message.sender, message, ...params);
      }
    } else if (message.mDirection === 'up') {
      this.__sendBubbles(this, message, true, ...params);
      message.mSender.__invokeOverheard(message.sender, message, ...params);
    } else {
      throw new Error('Unknown message type.');
    }
  }

  /**
   * @private
   * @param {*}  sender
   * @param {Message}  message
   * @param {boolean}  toTop
   * @param {...*} params
   *
   * @return {void}
   */
  __sendBubbles(sender, message, toTop, ...params) {
    message.mOrigin = toTop === true ? this : ( /** @type {GameObject} */ (this)).stage;

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
   * @param {*}  sender
   * @param {Message}  message
   * @param {GameObject=}  origin
   * @param {...*} params
   *
   * @return {void}
   */
  __sendGlobal(sender, message, origin, ...params) {
    if (origin === null)
      origin = /** @type {GameObject} */ (message.mOrigin);

    origin.__invoke(sender, message, ...params);
    origin.__invokeComponents(sender, message, ...params);

    for (let i = 0; i < origin.numChildren; i++) {
      let child = origin.getChildAt(i);
      child.__sendGlobal(sender, message, child, ...params);
    }
  }

  /**
   * @private
   * @param {*}  sender
   * @param {Message}  message
   * @param {...*} params
   *
   * @return {void}
   */
  __invoke(sender, message, ...params) {
    if (this.mListeners === null)
      return;

    let dispatchers = /** @type {Array<{callback: Function, context}>} */ (this.mListeners[message.mName]);

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
      let dispatcher = /** @type {{callback: Function, context: *}} */ (clone[i]);
      message.mTarget = this;
      dispatcher.callback.call(dispatcher.context, message, ...params);
    }
  }

  __invokeComponents(sender, message, toTop, ...params) {
    let isGameObject = this instanceof GameObject;
    if (isGameObject === false)
      return;  
    
    let go = /** @type {GameObject} */ (this);

    let len = go.mComponents.length;
    for (let i = 0; i < len; i++) {
      let c = go.mComponents[i];
      c.__invoke(sender, message, ...params);
    }
  }

  /**
   * @private
   * @param {*}  sender
   * @param {Message}  message
   * @param {...*} params
   *
   * @return {void}
   */
  __invokeOverheard(sender, message, ...params) {
    let dispatchers = MessageDispatcher.mOverheardHandlers[message.mName];

    if (dispatchers === undefined || dispatchers.length === 0)
      return;

    let clone = dispatchers.slice(0);

    for (let i = 0; i < clone.length; i++) {
      let dispatcher = /** @type {{callback: Function, context: *}} */ (clone[i]);

      if (!this.__checkPath(sender.path, dispatcher.pathMask))
        continue;

      message.mTarget = this;
      dispatcher.callback.call(dispatcher.context, message, ...params);
    }
  }

  /**
   * @private
   * @param {string} path
   * @param {string} pathMask
   *
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

  // TODO: parse exception path'ses like: ~tatata@@@omg####imnotidiout###@@~~
  /**
   * @private
   * @param {*} sender
   * @param {string} info
   *
   * @return {Message}
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

    Debug.assert(ixHash !== -1 && ixAt >= 0, 'Message syntax is not correct. Did you miss @?');

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

/**
 * @private
 * @dict
 */
MessageDispatcher.mOverheardHandlers = {};