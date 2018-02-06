/**
 * Sets initial particle rotation value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
/* @echo EXPORT */
class InitialRotation extends Modifier {
  /**
   * Creates new InitialRotation instance.
   *
   * @param {...(number|FloatScatter)} values Min and max values in radians.
   */
  constructor(...values) {
    super();

    /** @inheritDoc */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.r = this.scatter.getValue();
  }
}
