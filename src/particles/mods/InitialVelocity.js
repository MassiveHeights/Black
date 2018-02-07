/**
 * Sets initial particle velocity vector.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
/* @echo EXPORT */
class InitialVelocity extends Modifier {
  /**
   * Creates new InitialVelocity instance.
   *
   * @param {...(number|VectorScatter)} values Min and max vectors.
   */
  constructor(...values) {
    super();

    /** @type {VectorScatter} Modifier's object to get values from.  */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    this.scatter.getValue();

    particle.vx = this.scatter.value.x;
    particle.vy = this.scatter.value.y;
  }
}
