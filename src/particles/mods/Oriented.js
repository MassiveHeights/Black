/* @echo EXPORT */
class Oriented extends Modifier {
  constructor() {
    super(false);
  }

  /**
   * @inheritDoc
   *
   * @param {Emitter} emitter
   * @param {Particle} particle
   * @param {number} dt
   *
   * @return {void}
   */
  update(emitter, particle, dt) {
    particle.r = 1 * (Math.atan2(particle.vy, particle.vx) * MathEx.RAD2DEG - 90) * dt;
  }
}
