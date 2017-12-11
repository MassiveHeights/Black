/* @echo EXPORT */
class Oriented extends Action {
  constructor() {
    super();
  }

  /**
   * @inheritDoc
   *
   * @param {Emitter} emmiter
   * @param {Particle} particle
   * @param {number} dt
   *
   * @return {void}
   */
  update(emmiter, particle, dt) {
    particle.r = 1 * (Math.atan2(particle.vy, particle.vx) * MathEx.RAD2DEG - 90) * dt;
  }

  /**
   * Returns VectorScatter object that defines acceleration direction.
   * @member {VectorScatter}
   * @return {VectorScatter}
   */
  get scatter() {
    return this.mScatter;
  }
}
