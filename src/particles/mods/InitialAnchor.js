/**
 * Sets initial particle scale value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
/* @echo EXPORT */
class InitialAnchor extends Modifier {
  /**
   * Creates new InitialScale instance.
   *
   * @param {...(number|VectorScatter)} values
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
    let v = this.scatter.getValue();
    particle.anchorX = v.x;
    particle.anchorY = v.y;
  }
}