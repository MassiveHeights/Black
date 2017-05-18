/**
 * Base class for custom systems. System is used to listen scene changes.
 *
 * @cat core
 * @extends MessageDispatcher
 */
/* @echo EXPORT */
class System extends MessageDispatcher {
  constructor(){
    super();
  }


  /**
   * onFixedUpdate - Description
   *
   * @param {number} dt Description
   *
   * @return {void} Description
   */
  onFixedUpdate(dt){
  }


  /**
   * onUpdate - Description
   *
   * @param {number} dt Description
   * @param {number} t Description
   *
   * @return {void} Description
   */
  onUpdate(dt, t){
  }

  /**
   * onPostUpdate - Description
   *
   * @param {number} dt Description
   * @param {number} t Description
   *
   * @return {void} Description
   */
  onPostUpdate(dt, t){
  }


  /**
   * onChildrenAdded - Description
   *
   * @param {GameObject} child Description
   *
   * @return {void} Description
   */
  onChildrenAdded(child){
  }


  /**
   * onChildrenRemoved - Description
   *
   * @param {GameObject} child Description
   *
   * @return {void} Description
   */
  onChildrenRemoved(child){
  }


  /**
   * onComponentAdded - Description
   *
   * @param {GameObject} child     Description
   * @param {Component} component Description
   *
   * @return {void} Description
   */
  onComponentAdded(child, component)
  {}


  /**
   * onComponentRemoved - Description
   *
   * @param {GameObject} child     Description
   * @param {Component} component Description
   *
   * @return {void} Description
   */
  onComponentRemoved(child, component)
  {}
}
