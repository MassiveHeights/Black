/**
 * Component - Description
 * @unrestricted
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class Component extends MessageDispatcher {
  /**
   * constructor - description
   *
   * @return {void}          description
   */
  constructor() {
    super();

    /** @type {number} */
    this.mId = ++GameObject.ID;

    /** @type {GameObject|null} */
    this.gameObject = null;

    /** @type {boolean} */
    this.mAdded = false;
  }

  /**
   * onAdded - description
   *
   * @param  {GameObject} gameObject description
   * @return {void}            description
   */
  onAdded(gameObject) {}

  /**
   * onRemoved - description
   *
   * @param  {GameObject} gameObject description
   * @return {void}            description
   */
  onRemoved(gameObject) {}

  /**
   * onFixedUpdate - description
   *
   * @param  {number} dt description
   * @return {void}    description
   */
  onFixedUpdate(dt) {}

  /**
   * onUpdate - description
   *
   * @param  {number} dt description
   * @return {void}    description
   */
  onUpdate(dt) {}

  /**
   * onUpdate - description
   *
   * @param  {number} dt description
   * @return {void}    description
   */
  onPostUpdate(dt) {}

  // TODO: finish
  dispose() {}

  // TODO: finish
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
