import { MessageDispatcher } from "../messages/MessageDispatcher";

/**
 * Base class for custom systems. System is used to listen scene changes.
 *
 * @cat core
 * @extends MessageDispatcher
 */
export class System extends MessageDispatcher {
  constructor() {
    super();
  }

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

  /**
   * Disposes all allocated resources.
   */
  dispose() { }
}
