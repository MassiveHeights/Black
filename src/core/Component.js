/**
 * Component - Description
 * @unrestricted
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class Component extends MessageDispatcher {
  /**
   * Creates new Component instance
   */
  constructor() {
    super();

    /**
     * @private
     * @type {number}
     */
    this.mId = ++GameObject.ID;

    /**
     * @private
     * @type {GameObject|null}
     */
    this.gameObject = null;

    /**
     * @private
     * @type {boolean}
     */
    this.mAdded = false;
  }

  /**
   * Called when attached to GameObject.
   *
   * @protected
   * @param  {GameObject} gameObject The owner of this component.
   * @return {void}
   */
  onAdded(gameObject) {}

  /**
   * Called when detached from GameObject.
   *
   * @protected
   * @param  {GameObject} gameObject The owner of this component.
   * @return {void}
   */
  onRemoved(gameObject) {}

  /**
   * Called at every fixed frame update.
   * @protected
   * @param  {number} dt Amount of seconds since the last update.
   * @return {void}
   */
  onFixedUpdate(dt) {}

  /**
   * Called at every engine update.
   * @protected
   * @param  {number} dt Amount of seconds since the last update.
   * @return {void}
   */
  onUpdate(dt) {}

  /**
   * Called after all updates have been executed.
   * @protected
   * @param  {number} dt Amount of seconds since the last update.
   * @return {void}
   */
  onPostUpdate(dt) {}

  // TODO: finish
  dispose() {}

  // TODO: finish

  /**
   * Detaches this Component from its parent GameObject.
   * @returns {void}
   */
  removeFromParent() {
    if (this.gameObject === null)
      return;

    this.gameObject.removeComponent(this);
  }
}


/** @type {number}
 * @nocollapse
 */
Component.ID = 0;
