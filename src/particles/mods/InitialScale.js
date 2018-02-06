/**
 * Sets initial particle scale value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
/* @echo EXPORT */
class InitialScale extends Modifier {
  /**
   * Creates new InitialScale instance.
   *
   * @param {...(number|FloatScatter)} values Min and max values.
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
    particle.scaleX = particle.scaleY = this.scatter.getValue();
  }
}
