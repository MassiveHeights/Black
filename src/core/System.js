import { MessageDispatcher } from "../messages/MessageDispatcher";

/**
 * Base class for custom systems. System is used to listen scene changes.
 *
 * @cat core
 * @extends black-engine~MessageDispatcher
 */
export class System extends MessageDispatcher {
  constructor() {
    super();
  }

  /**
   * Called when engine is paused.
   *
   * @public
   * @return {void} 
   */
  onPause() { }

  /**
   * Called when engine is resumed.
   *
   * @public
   * @return {void} 
   */
  onResume() { }

  /**
   * onUpdate
   *
   * @protected
   * @return {void} 
   */
  onUpdate() { }

  /**
   * onPostUpdate
   *
   * @protected
   * @return {void}
   */
  onPostUpdate() { }

  /**
   * onRender
   *
   * @protected
   * @return {void}
   */
  onRender() { }

  /**
   * onChildrenAdded
   *
   * @protected
   * @param {black-engine~GameObject} gameObject GameObject instance.
   * @return {void}
   */
  onChildrenAdded(gameObject) { }

  /**
   * onChildrenRemoved
   *
   * @protected
   * @param {black-engine~GameObject} gameObject GameObject instance.
   * @return {void}
   */
  onChildrenRemoved(gameObject) { }

  /**
   * onChildrenRemoved
   *
   * @protected
   * @param {black-engine~GameObject} gameObject GameObject instance.
   * @return {void}
   */
  onChildrenChanged(gameObject) { }

  /**
   * onComponentAdded
   *
   * @protected
   * @param {black-engine~GameObject} child GameObject instance.
   * @param {black-engine~Component} component Component instance added to game object.
   * @return {void} 
   */
  onComponentAdded(child, component) { }

  /**
   * onComponentRemoved
   *
   * @protected
   * @param {black-engine~GameObject} child GameObject instance.
   * @param {black-engine~Component} component Component instance removed from game object.
   * @return {void}
   */
  onComponentRemoved(child, component) { }

  /**
   * Disposes all allocated resources.
   */
  dispose() { }
}
