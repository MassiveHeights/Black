/**
 * Sets particle's rotation value according to its energy value.
 *
 * @cat particles.modifiers
 * @extends Modifier
 * @class
 */
/* @echo EXPORT */
class RotationOverLife extends Modifier {
  /**
   * Creates new RotationOverLife instance.
   *
   * @param {...(number|FloatScatter)} values A starting and ending values of alpha property.
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
    particle.r = this.scatter.getValueAt(particle.energy);
  }
}
