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
    super(true);

    /** @private @type {number} */
    this.mId = ++Component.ID;

    /** @private @type {GameObject|null} */
    this.mGameObject = null;

    /** @private @type {boolean} */
    this.mAdded = false;
  }

  /**
   * Called when attached to GameObject.
   *
   * @protected
   * @param  {GameObject} gameObject The owner of this component.
   * @return {void}
   */
  onAdded(gameObject) { }

  /**
   * Called when detached from GameObject.
   *
   * @protected
   * @param  {GameObject} gameObject The owner of this component.
   * @return {void}
   */
  onRemoved(gameObject) { }

  /**
   * Called at every fixed frame update.
   *
   * @protected
   * @param  {number} dt Amount of seconds since the last update.
   * @return {void}
   */
  onFixedUpdate(dt) { }

  /**
   * Called at every engine update.
   *
   * @protected
   * @param  {number} dt Amount of seconds since the last update.
   * @return {void}
   */
  onUpdate(dt) { }

  /**
   * Called after all updates have been executed.
   *
   * @protected
   * @param  {number} dt Amount of seconds since the last update.
   * @return {void}
   */
  onPostUpdate(dt) { }

  /**
   * Detaches this Component from its parent GameObject.
   *
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
   * @readonly
   * @returns {GameObject}
   */
  get gameObject() {
    return this.mGameObject;
  }
  
  /**
   * Returns this Component owner GameObject.
   * @readonly
   * @return {GameObject|null}
   */
  get parent() {
    return this.mGameObject;
  }

  /**
   * Returns the stage Game Object to which this component belongs to or null if not on the stage.
   *
   * @override
   * @readonly
   * @return {Stage|null}
   */
  get stage() {
    if (this.mGameObject === null)
      return null;

    return this.mGameObject.stage;
  }

  /**
   * Returns string representing a url like path to this object in the display tree.
   *
   * @override
   * @readonly
   * @return {string|null}
   */
  get path() {
    if (this.mGameObject !== null)
      return this.mGameObject.path + '#' + this.constructor.name;

    return this.constructor.name;
  }
}

/**
 * @ignore
 * @type {number}
 * @nocollapse
 */
Component.ID = 0;