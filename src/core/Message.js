/**
 * Message holds all information about dispatched event.
 *
 * @cat core
 */
/* @echo EXPORT */
class Message {
  constructor() {
    /**
     * @private
     * @type {*}
     */
    this.mSender = null;

    /**
     * @private
     * @type {string}
     */
    this.mName;

    /**
     * @private
     * @type {string|null}
     */
    this.mPathMask = null;

    /**
     * @private
     * @type {string|null}
     */
    this.mComponentMask = null;

    /**
     * @private
     * @type {string}
     */
    this.mDirection = 'none';

    /**
     * @private
     * @type {boolean}
     */
    this.mSibblings = false;

    /**
     * @private
     * @type {Object}
     */
    this.mOrigin = null;

    /**
     * @private
     * @type {Object}
     */
    this.mTarget = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mCanceled = false;
  }

  /**
   * @return {string|null}
   */  
  get path() {
    var hasComponentMask = this.mComponentMask !== null;

    if (this.mPathMask !== null) {
      if (hasComponentMask === true)
        return this.mPathMask + '#' + this.mComponentMask;
      else
        return this.mPathMask;  
    }
    else if (hasComponentMask === true) {
      return this.mComponentMask;
    }

    return null;
  }

  /**
   * Who send the message.
   *
   * @return {*}
   */
  get sender() {
    return this.mSender;
  }

  /**
   * The name of the message.
   *
   * @return {string}
   */
  get name() {
    return this.mName;
  }

  /**
   * Direction in what message was sent. Can be 'none', 'up' and 'down'.
   *
   * @return {string}
   */
  get direction() {
    return this.mDirection;
  }

  /**
   * Indicates if sibblings should be included into dispatching process.
   *
   * @return {boolean}
   */
  get sibblings() {
    return this.mSibblings;
  }

  /**
   * The GameObject.name mask string if was used.
   *
   * @return {string|null}
   */
  get pathMask() {
    return this.mPathMask;
  }

  /**
   * Component mask string if was used.
   *
   * @return {string|null}
   */
  get componentMask() {
    return this.mComponentMask;
  }

  /**
   * The original sender of a message.
   *
   * @return {*|null}
   */
  get origin() {
    return this.mOrigin;
  }

  /**
   * The listener object.
   *
   * @return {*|null}
   */
  get target() {
    return this.mTarget;
  }

  // /**
  //  * Stops propagation of the message.
  //  *
  //  * @return {void}
  //  */
  // cancel() {
  //   this.mCanceled = true;
  // }

  // /**
  //  * True if message was canceled by the user.
  //  *
  //  * @return {boolean}
  //  */
  // get canceled() {
  //   return this.mCanceled;
  // }

  static get PROGRESS() {
    return 'progress';
  }
  static get COMPLETE() {
    return 'complete';
  }
}