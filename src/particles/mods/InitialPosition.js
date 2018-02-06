/**
 * Sets initial particle position.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
/* @echo EXPORT */
class InitialPosition extends Modifier {
  /**
   * Creates new InitialPosition instance.
   *
   * @param {...(number|VectorScatter)} values Rectangle coordinates, its width and height.
   */
  constructor(...values) {
    super();

    /** @inheritDoc */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    let v = this.scatter.getValue();
    particle.x = v.x;
    particle.y = v.y;
  }
}