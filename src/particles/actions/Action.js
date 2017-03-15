/* @echo EXPORT */
class Action {

  /**
   * preUpdate - Description
   *
   * @param {number} dt Description
   * @param {number} t  Description
   *
   * @return {void} Description
   */
  preUpdate(dt, t) {}


  /**
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */
  update(emmiter, particle, dt, t) {}


  /**
   * postUpdate
   *
   * @param {number} dt
   * @param {number} t
   *
   * @return {void}
   */
  postUpdate(dt, t) {}
}
