/**
 * Changes particle alpha according to its life.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
/* @echo EXPORT */
class AnchorOverLife extends Modifier {
  /**
   * Creates new Acceleration instance.
   *
   * @param {...(number|VectorScatter)} values An VectorScatter which defines acceleration direction.
   */
  constructor(...values) {
    super(false);

    /** @type {VectorScatter} Modifier's object to get values from.  */
    this.scatter = VectorScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    this.scatter.getValueAt(particle.energy);

    particle.anchorX = this.scatter.value.x;
    particle.anchorY = this.scatter.value.y;
  }
}