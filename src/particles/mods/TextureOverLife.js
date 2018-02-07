/**
 * Sets particle's texture according to its energy value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 */
/* @echo EXPORT */
class TextureOverLife extends Modifier {
  /**
   * Creates new TextureOverLife instance.
   *
   * @param {...(number|FloatScatter)} values A starting and ending values of textureIndex property.
   */
  constructor(...values) {
    super(false);

    /** @type {FloatScatter} Modifier's object to get values from.  */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   */
  update(emitter, particle, dt) {
    particle.textureIndex = Math.round(this.scatter.getValueAt(particle.energy));
  }
}
