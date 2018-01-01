/**
 * Sets particle's alpha value according to its energy value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 * @class
 */
/* @echo EXPORT */
class AlphaOverLife extends Modifier {
  /**
   * Creates new AlphaOverLife instance.
   *
   * @param {...(number|FloatScatter)} values A starting and ending values of alpha property.
   */
  constructor(...values) {
    super(false);

    /** @type {...(number|FloatScatter)} */
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
    particle.alpha = this.scatter.getValueAt(particle.energy);
  }
}
