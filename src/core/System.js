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
   * @protected
   * @param {number} dt Delta time.
   * @return {void}
   */
  onFixedUpdate(dt) { }

  /**
   * onUpdate
   *
   * @protected
   * @param {number} dt Delta time.
   * @param {number} t Time since engine start.
   * @return {void} 
   */
  onUpdate(dt, t) { }

  /**
   * onPostUpdate
   *
   * @protected
   * @param {number} dt Delta time.
   * @param {number} t Time since engine start.
   * @return {void}
   */
  onPostUpdate(dt, t) { }

  /**
   * onChildrenAdded
   *
   * @protected
   * @param {GameObject} gameObject GameObject instance.
   * @return {void}
   */
  onChildrenAdded(gameObject) { }

  /**
   * onChildrenRemoved
   *
   * @protected
   * @param {GameObject} gameObject GameObject instance.
   * @return {void}
   */
  onChildrenRemoved(gameObject) { }

  /**
   * onChildrenRemoved
   *
   * @protected
   * @param {GameObject} gameObject GameObject instance.
   * @return {void}
   */
  onChildrenChanged(gameObject) { }

  /**
   * onComponentAdded
   *
   * @protected
   * @param {GameObject} child GameObject instance.
   * @param {Component} component Component instance added to game object.
   * @return {void} 
   */
  onComponentAdded(child, component) { }

  /**
   * onComponentRemoved
   *
   * @protected
   * @param {GameObject} child GameObject instance.
   * @param {Component} component Component instance removed from game object.
   * @return {void}
   */
  onComponentRemoved(child, component) { }
}
