import { MessageDispatcher } from "../messages/MessageDispatcher";

/**
 * @ignore
 * @type {number}
 */
let ID = 0;

/**
 * A base class for custom components.
 *
 * @cat core
 * @unrestricted
 * @extends MessageDispatcher
 */
export class Component extends MessageDispatcher {
  /**
   * Creates new Component instance.
   */
  constructor() {
    super(true);

    /** 
     * @private 
     * @type {number} 
     */
    this.mId = ++ID;

    /** 
     * @private 
     * @type {GameObject|null} 
     */
    this.mGameObject = null;

    /** 
     * @private 
     * @type {boolean} 
     */
    this.mAdded = false;

    /**
     * Indicates whenever this modifier is active or not.
     * @type {boolean}
     */
    this.isActive = true;
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
   * Called at every update.
   *
   * @protected
   * @return {void}
   */
  onUpdate() { }

  /**
   * Called after all updates have been executed but before DisplayObject's onRender. GameObject itself does not have onRender method so Component#onRender will not be called on GameObjects.
   * This method can be used to interpolate/extrapolate values when low `Black#ups` value is used.
   *
   * @protected
   * @return {void}
   */
  onRender() { }

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
