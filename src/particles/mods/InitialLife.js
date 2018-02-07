/**
 * Sets initial particle life value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
/* @echo EXPORT */
class InitialLife extends Modifier {
  /**
   * Creates new InitialLife instance.
   *
   * @param {...(number|FloatScatter)} values Min and max values in seconds.
   */
  constructor(...values) {
    super();

    /** @type {FloatScatter} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.life = this.scatter.getValue();
  }
}