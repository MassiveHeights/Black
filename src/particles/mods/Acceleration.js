/**
 * Adds acceleration to particles along given direction.
 *
 * @cat particles.modifiers
 * @extends Modifier
 * @class
 */
/* @echo EXPORT */
class Acceleration extends Modifier {
  /**
   * Creates new Acceleration instance.
   *
   * @param {...(number|VectorScatter)} values An VectorScatter which defines acceleration direction.
   */
  constructor(...values) {
    super(false);

    /**
     * @type {...(number|VectorScatter)}
     */
    this.scatter = VectorScatter.fromObject(...values);
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
    this.scatter.getValue();
    
    particle.ax += this.scatter.value.x;
    particle.ay += this.scatter.value.y;
  }
}
