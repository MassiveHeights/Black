/**
 * Base class for custom systems. System is used to listen scene changes.
 *
 * @cat core
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class System extends MessageDispatcher {
  constructor() {
    super();
  }

  /**
   * onFixedUpdate
   *
   * @param {number} dt
   *
   * @return {void}
   */
  onFixedUpdate(dt) { }

  /**
   * onUpdate
   *
   * @param {number} dt
   * @param {number} t
   *
   * @return {void} 
   */
  onUpdate(dt, t) { }

  /**
   * onPostUpdate
   *
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */
  onPostUpdate(dt, t) { }

  /**
   * onChildrenAdded
   *
   * @param {GameObject} gameObject
   *
   * @return {void}
   */
  onChildrenAdded(gameObject) { }

  /**
   * onChildrenRemoved
   *
   * @param {GameObject} child
   *
   * @return {void}
   */
  onChildrenRemoved(gameObject) { }

  /**
   * onChildrenRemoved
   *
   * @param {GameObject} gameObject
   *
   * @return {void}
   */
  onChildrenChanged(gameObject) { }

  /**
   * onComponentAdded
   *
   * @param {GameObject} gameObject
   * @param {Component} component
   *
   * @return {void} 
   */
  onComponentAdded(child, component) { }

  /**
   * onComponentRemoved
   *
   * @param {GameObject} child
   * @param {Component} component
   *
   * @return {void}
   */
  onComponentRemoved(child, component) { }
}
