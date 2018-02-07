/**
 * Rotates particle along velocity vector.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
/* @echo EXPORT */
class Oriented extends Modifier {
  /**
   * Creates new instance of oriented modifier.
   */
  constructor() {
    super(false);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.r = (Math.atan2(particle.vy, particle.vx) * MathEx.RAD2DEG - 90) * dt;
  }
}
