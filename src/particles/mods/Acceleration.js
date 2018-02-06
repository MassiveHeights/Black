/**
 * Adds acceleration to particles along given direction.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
/* @echo EXPORT */
class Acceleration extends Modifier {
  /**
   * Creates new Acceleration instance.
   *
   * @param {...(number|VectorScatter)} values An VectorScatter which defines acceleration direction.
   */
  constructor(...values) {
    super(false);

    /** @inheritDoc */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    this.scatter.getValue();
    
    particle.ax += this.scatter.value.x;
    particle.ay += this.scatter.value.y;
  }
}
