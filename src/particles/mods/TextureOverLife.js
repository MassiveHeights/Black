/**
 * Sets particle's texture according to its energy value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 * @class
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

    /**
     * @private
     * @type {...(number|FloatScatter)}
     */
    this.scatter = FloatScatter.fromObject(...values);
  }

  /**
   * @inheritDoc
   *
   * @param {Emitter} emitter
   * @param {Particle} particle
   * @param {number} dt
   *
   * @return {void}
   */
  update(emitter, particle, dt) {
    particle.textureIndex = Math.round(this.scatter.getValueAt(particle.energy));
  }
}
