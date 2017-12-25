/**
 * A base class for particle system actions. Every frame each action executed over each particle.
 *
 * @cat particles.actions
 * @abstract
 * @class
 */
/* @echo EXPORT */
class Action {
  /**
   * Creates new Action instance.
   */
  constructor(){
  }

  /**
   * Called for every particle before any update method called.
   *
   * @protected
   * @param {number} dt Amount of seconds since the last update.
   *
   * @return {void} Description
   */
  preUpdate(dt) {}


  /**
   * Called for every particle.
   *
   * @param {Emitter} emitter   The owner of the particle.
   * @param {Particle} particle The particle to execute update on.
   * @param {number} dt         Amount of seconds since the last update.
   *
   * @return {void}
   */
  update(emitter, particle, dt) {}


  /**
   * Called after all updates have been executed.
   *
   * @param {number} dt Amount of seconds since the last update.
   *
   * @return {void}
   */
  postUpdate(dt) {}
}
