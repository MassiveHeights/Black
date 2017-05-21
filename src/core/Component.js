/**
 * A base class for custom components.
 *
 * @cat core
 * @unrestricted
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class Component extends MessageDispatcher {
  /**
   * Creates new Component instance.
   */
  constructor() {
    super();

    /** @private
     * @type {number} 
     */
    this.mId = ++GameObject.ID;

    /** @private
     * @type {GameObject|null}
     */
    this.mGameObject = null;

    /** @private
     * @type {boolean}
     */
    this.mAdded = false;
  }

  /**
   * Called when attached to GameObject.
   *
   * @public
   * @param  {GameObject} gameObject The owner of this component.
   * @return {void}
   */
  onAdded(gameObject) {}

  /**
   * Called when detached from GameObject.
   *
   * @public
   * @param  {GameObject} gameObject The owner of this component.
   * @return {void}
   */
  onRemoved(gameObject) {}

  /**
   * Called at every fixed frame update.
   * @public
   * @param  {number} dt Amount of seconds since the last update.
   * @return {void}
   */
  onFixedUpdate(dt) {}

  /**
   * Called at every engine update.
   * @public
   * @param  {number} dt Amount of seconds since the last update.
   * @return {void}
   */
  onUpdate(dt) {}

  /**
   * Called after all updates have been executed.
   * @public
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
    if (this.mGameObject === null)
      return;

    this.mGameObject.removeComponent(this);
  }

  /**
   * Returns owner of this component.
   *
   * @returns {GameObject}
   */
  get gameObject() {
    return this.mGameObject;
  }
}


/** @type {number}
 * @nocollapse
 */
Component.ID = 0;
