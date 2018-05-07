/**
 * A bridge between callback and context.
 * 
 * @cat messages
 */
/* @echo EXPORT */
class MessageBinding {
  /**
   * @param {MessageDispatcher} owner   The owner of this binding.
   * @param {string} name               Name of the message.
   * @param {Function} callback         Callback function.
   * @param {boolean} isOnce            Indicates whenever this binding should be auto destroyed after first execution.
   * @param {*=} [context=null]         Optional context (usually this).
   * @param {string=} [pathPattern=null] Glob pattern to filter sender by name.
   */
  constructor(owner, name, callback, isOnce, context = null, pathPattern = null) {
    /** @type {MessageDispatcher} */
    this.owner = owner;

    /** @type {string} */
    this.name = name;

    /** @type {Function} */
    this.callback = callback;

    /** @type {boolean} */
    this.isOnce = isOnce;

    /** @type {*} */
    this.context = context;

    /** @type {?string} */
    this.pathPattern = pathPattern;

    /** @type {?Glob} */
    this.glob = null;

    if (pathPattern != null)
      this.glob = new Glob(pathPattern);
  }

  /**
   * Destroys this binding.
   */
  off() {
    this.owner.__off(this);
  }

  /**
   * @ignore
   * @returns {MessageBinding}
   */
  __reset() {
    this.owner = null;
    this.pathPattern = null;
    return this;
  }
}