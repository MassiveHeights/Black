import { BindingType } from './BindingType';
import { Message } from './Message';
import { MessageType } from './MessageType';
import { MessageBinding } from './MessageBinding';
import { Debug } from '../core/Debug';
import { Black } from '../Black';

/**
 * The MessageDispatcher class is the base class for all classes that posts messages.
 *
 * Global messages will not be dispatched on non GameObject objects.
 *
 * @cat core
 */
export class MessageDispatcher {
  /**
   * Creates new MessageDispatcher instance
   * @param {boolean} [checkForStage=false]
   */
  constructor(checkForStage = false) {
    this.mBindings = null;
    this.checkForStage = checkForStage;
  }

  /**
   * Adds listener by given name and callback.
   *
   * @public
   * @param {string} name       Message name.
   * @param {Function} callback Function to be called on message send.
   * @param {*} [context=null]  Object to be used as `this` in callback function.
   * @return {MessageBinding}
   */
  on(name, callback, context) {
    return this.__on(name, callback, false, context);
  }

  /**
   * Removes all bindings by given message name.
   * 
   * @public
   * @param {...string} names One or more message name.
   * @returns {void}
   */
  off(...names) {
    for (let i = 0; i < names.length; i++) {
      const name = names[i];

      let earIndex = name.indexOf('@');
      if (earIndex !== -1) {
        Debug.error('Removing overheard bindings is not allowed.');
        return;
      }

      if (this.mBindings !== null && this.mBindings.hasOwnProperty(name) === true) {
        let bindings = this.mBindings[name].slice();

        for (let i = 0; i < bindings.length; i++)
          this.__off(bindings[i]);
      }
    }
  }

  /**
   * Adds listener by given name and callback. Binding will be automatically removed after first execution.
   *
   * @public
   * @param {string} name       Message name.
   * @param {Function} callback Function to be called on message send.
   * @param {*} [context=null]  Object to be used as `this` in callback function.
   * @return {MessageBinding}
   */
  once(name, callback, context) {
    return this.__on(name, callback, true, context);
  }

  /**
   * Posts message with a given params.
   * 
   * Adding `~` character to the begging of the name will bubble message to the top of the tree.
   *
   * @public
   * @param {string} name  The name of a message
   * @param {...*} params  A list of params to send
   * @return {void}
   */
  post(name, ...params) {
    let message = this.__draftMessage(name);

    if (message.type === MessageType.DIRECT)
      this.__invoke(this, message, ...params);
    else if (message.type === MessageType.BUBBLE)
      this.__postBubbles(this, message, true, ...params);

    if (message.canceled === false)
      this.__invokeOverheard(this, message, ...params);

    Message.pool.release(message);
  }

  /**
   * Returns parent MessageDispatcher.
   * 
   * @readonly
   * @return {MessageDispatcher|null}
   */
  get parent() {
    return null;
  }

  /**
   * Returns the stage Game Object to which this belongs to or null if not added onto stage.
   *
   * @readonly
   * @return {Stage|null}
   */
  get stage() {
    return null;
  }

  /**
   * Returns string representing a url like path to this object in the display
   * tree.
   *
   * @readonly
   * @return {string|null}
   */
  get path() {
    return null;
  }

  /**
   * @private
   * @ignore
   * @param {string} name
   * @param {Function} callback
   * @param {boolean} [isOnce=false]
   * @param {*} [context=null]
   * @return {MessageBinding}
   */
  __on(name, callback, isOnce = false, context = null) {
    Debug.assert(name !== null, 'name cannot be null.');
    Debug.assert(name.trim().length > 0, 'name cannot be null.');
    Debug.assert(!(name.indexOf('~') === 0), 'Using `~` is not tot allowed here.');
    Debug.assert(callback !== null, 'callback cannot be null.');

    let earIndex = name.indexOf('@');
    if (earIndex !== -1) {
      let messageName = name.substring(0, earIndex);
      let pathPattern = name.substring(earIndex + 1);
      let global = MessageDispatcher.mOverheardHandlers;

      if (global.hasOwnProperty(messageName) === false)
        global[messageName] = [];

      let bindings = global[messageName];
      let binding = new MessageBinding(this, messageName, callback, isOnce, context, BindingType.OVERHEARD, pathPattern);
      bindings.push(binding);
      return binding;
    }

    if (this.mBindings === null)
      this.mBindings = {};

    if (this.mBindings.hasOwnProperty(name) === false)
      this.mBindings[name] = [];

    let binding = new MessageBinding(this, name, callback, isOnce, context, BindingType.REGULAR);
    this.mBindings[name].push(binding);

    return binding;
  }

  /**
   * @ignore
   * @param {MessageBinding} binding 
   */
  __off(binding) {
    if (binding.type === BindingType.REGULAR) {
      if (this.mBindings === null)
        return;

      if (this.mBindings.hasOwnProperty(binding.name) === false)
        return;

      let bindings = this.mBindings[binding.name];
      const ix = bindings.indexOf(binding);
      if (ix === -1)
        return;

      bindings.splice(ix, 1);
    } else if (binding.type === BindingType.OVERHEARD) {
      let global = MessageDispatcher.mOverheardHandlers;
      if (global.hasOwnProperty(binding.name) === false)
        return;

      let bindings = global[binding.name];

      const ix = bindings.indexOf(binding);
      if (ix === -1)
        return;

      bindings.splice(ix, 1);
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
  __invoke(sender, message, ...params) {
    if (message.canceled === true)
      return;

    if (this.mBindings === null)
      return;

    if (this.checkForStage === true && this !== Black.stage && this.stage === null)
      return;

    let bindings = (this.mBindings[message.name]);

    if (bindings === undefined || bindings.length === 0)
      return;

    let cloned = bindings.slice(0);

    for (let i = 0; i < cloned.length; i++) {
      message.target = this;

      let binding = cloned[i];

      if (this.checkForStage === true && binding.owner.stage === Black.stage && binding.owner.stage === null)
        continue;

      binding.callback.call(binding.context, message, ...params);

      if (binding.isOnce === true)
        this.__off(binding);

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

    let bindings = MessageDispatcher.mOverheardHandlers[message.name];

    if (bindings === undefined || bindings.length === 0)
      return;

    let cloned = bindings.slice(0);

    for (let i = 0; i < cloned.length; i++) {
      let binding = cloned[i];

      if (this.checkForStage === true && binding.owner.stage === Black.stage && binding.owner.stage === null)
        continue;

      if (!this.__checkPath(sender.path, binding))
        continue;

      message.target = this;
      binding.callback.call(binding.context, message, ...params);

      if (binding.isOnce === true)
        this.__off(binding);

      if (message.canceled === true)
        return;
    }
  }

  /**
   * Message will always reach the stage even if some of the middle nodes were removed during process of invocation.
   * 
   * @private
   * @ignore
   * @param {*}  sender
   * @param {Message}  message
   * @param {boolean}  toTop
   * @param {...*} params
   * @return {void}
   */
  __postBubbles(sender, message, toTop, ...params) {
    message.origin = this;

    let list = [this];

    let current = this;
    while (current.parent !== null) {
      list.push(current.parent);
      current = current.parent;
    }

    for (let i = 0; i < list.length; i++) {
      let dispatcher = list[i];
      dispatcher.__invoke(sender, message, ...params);

      if (message.canceled === true)
        return;
    }
  }

  /**
   * @private
   * @ignore
   * 
   * @param {string} name 
   * @returns {Message}
   */
  __draftMessage(name) {
    const message = Message.pool.get();
    message.__reset();

    message.sender = this;

    if (name.charAt(0) === '~') {
      message.name = name.substr(1);
      message.type = MessageType.BUBBLE;
    } else {
      message.name = name;
    }

    return message;
  }

  /**
   * @ignore
   * @private
   * @param {string|null} path
   * @param {MessageBinding} binding
   * @returns {boolean}
   */
  __checkPath(path, binding) {
    if (path === null || binding.pathPattern === null)
      return false;

    if (path === binding.pathPattern)
      return true;

    if (binding.pathPattern.indexOf('*') === -1)
      return path === binding.pathPattern;

    return binding.glob.test(path);
  }

  static dispose() {
    MessageDispatcher.mOverheardHandlers = {};
  }
}

/**
 * @private
 * @type {Object.<string, Array>}
 */
MessageDispatcher.mOverheardHandlers = {};