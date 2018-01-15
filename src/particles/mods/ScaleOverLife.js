/**
 * Sets particle's scale value according to its energy value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 * @class
 */
/* @echo EXPORT */
class ScaleOverLife extends Modifier {
  /**
   * Creates new ScaleOverTime instance.
   *
   * @param {...(number|FloatScatter)} values A starting and ending values of scale property.
   */
  constructor(...values) {
    super(false);

    /**
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
    particle.scaleX = particle.scaleY = this.scatter.getValueAt(particle.energy);
  }
}
